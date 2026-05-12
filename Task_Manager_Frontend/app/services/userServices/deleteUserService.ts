import apiClient from "../apiClient";

export async function deleteUserService(): Promise<void> {
  await apiClient.delete("user");

  return;
}
