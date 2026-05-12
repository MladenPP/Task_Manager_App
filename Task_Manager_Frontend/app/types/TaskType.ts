import { TaskStatus } from "./TaskStatus";

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: TaskStatus;
};
