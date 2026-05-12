"use client";
import { useEffect, useState } from "react";
import { getTaskService } from "../services/taskServices/getTaskService";
import { TaskStatus } from "../types/TaskStatus";
import { updateTaskService } from "../services/taskServices/updateTaskService";
import { deleteTaskService } from "../services/taskServices/deleteTaskService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useTask(id: string) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    createdAt: "",
    dueDate: "",
    status: TaskStatus.BACKLOG,
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const update = async () => {
    try {
      await updateTaskService(task);
      setError("");
      return true;
    } catch (err: unknown) {
      getErrorMessage(err, setError);
      return false;
    }
  };

  const deleteTask = async () => {
    try {
      await deleteTaskService(id);
      setError("");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskService(id);
        setTask(task);
      } catch (err: unknown) {
        getErrorMessage(err, setError);
      }
    };
    if (id) {
      fetchTask();
    }
  }, [id]);

  return { task, error, isEditing, setTask, setIsEditing, update, deleteTask };
}
