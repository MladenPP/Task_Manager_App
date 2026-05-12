import apiClient from "../apiClient";

export async function deleteTaskService(id: string): Promise<void> {
  await apiClient.delete(`task/${id}`);

  return;
}
