import { Task } from "../../types/TaskType";
import apiClient from "../apiClient";

export async function getTaskService(id: string): Promise<Task> {
  const res = await apiClient.get(`task/${id}`);

  return res.data;
}
