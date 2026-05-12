"use client";

import { TaskStatus } from "../../types/TaskStatus";
import Column from "../molecules/Column";
import { Task } from "../../types/TaskType";
import ErrorMessage from "../atoms/ErrorMessage";

type TaskListProps = {
  tasks: Task[];
  error: string;
  loading: boolean;
  activeTaskId?: string | null;
};

const columns = [
  { status: TaskStatus.BACKLOG, label: "Backlog" },
  { status: TaskStatus.TO_DO, label: "To Do" },
  { status: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { status: TaskStatus.TESTING, label: "Testing" },
  { status: TaskStatus.DONE, label: "Done" },
] as const;

export default function TaskBoard({
  tasks,
  error,
  loading,
  activeTaskId,
}: TaskListProps) {
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {columns.map((col) => (
        <Column
          key={col.status}
          status={col.status}
          title={col.label}
          tasks={tasks.filter((t) => t.status === col.status)}
          loading={loading}
          activeTaskId={activeTaskId}
        />
      ))}
    </>
  );
}
