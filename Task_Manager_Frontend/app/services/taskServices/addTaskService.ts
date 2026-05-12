import { Task } from "../../types/TaskType";
import apiClient from "../apiClient";

export async function addTaskService(
  boardId: string,
  title: string,
  dueDate: Date,
  description: string,
  userId?: string,
): Promise<Task> {
  const res = await apiClient.post("task", {
    boardId,
    userId,
    title,
    dueDate,
    description,
  });

  return res.data;
}
