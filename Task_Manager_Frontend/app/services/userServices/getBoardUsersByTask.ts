import { User } from "../../types/UserType";
import apiClient from "../apiClient";

export async function getBoardUsersByTaskService(
  taskId: string,
): Promise<User[]> {
  const res = await apiClient.get(`user/${taskId}`);
  return res.data;
}
