import apiClient from "../apiClient";

export async function logoutService(): Promise<void> {
  await apiClient.post("auth/logout");

  return;
}
