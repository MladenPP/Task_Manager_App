"use client";

import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useTaskList } from "../../hooks/useTaskList";
import { TaskStatus } from "../../types/TaskStatus";
import { Task } from "../../types/TaskType";
import { useEffect, useState } from "react";
import BoardPageTemplate from "./BoardPageTemplate";
import ListPageTemplate from "./ListPageTemplate";
import { useView, ViewProvider } from "../../../app/context/ViewContext";
import { socket } from "../../lib/socket";
import { useParams } from "next/navigation";

export default function ToggleViewTemplate() {
  return (
    <ViewProvider>
      <ToggleViewContent />
    </ViewProvider>
  );
}

function ToggleViewContent() {
  const { tasks, error, loading, updateStatus, setTasks, setError } =
    useTaskList();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const params = useParams();
  const boardId = Number(params.id);

  const { view } = useView();

  useEffect(() => {
    socket.emit("board:join", boardId);

    socket.on("task:created", (task: Task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task:updated", (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    });

    socket.on("task:deleted", (taskId: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    });

    return () => {
      socket.emit("board:leave", boardId);

      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [setTasks, boardId]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task;
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);
    if (!over) return;

    const taskId = active.id;

    const newStatus = over.id as TaskStatus;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      const updatedTask: Task = {
        ...task,
        status: newStatus,
      };

      const res = await updateStatus(updatedTask);

      setTasks((prev) => prev.map((task) => (task.id === taskId ? res : task)));
    }
  };

  return view === "board" ? (
    <BoardPageTemplate
      tasks={tasks}
      error={error}
      loading={loading}
      activeTask={activeTask}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
    />
  ) : (
    <ListPageTemplate error={error} loading={loading} setError={setError} />
  );
}
