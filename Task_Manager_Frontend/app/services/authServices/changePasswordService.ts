import apiClient from "../apiClient";

export async function changePasswordService(
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  await apiClient.patch("auth/password", {
    oldPassword,
    newPassword,
  });

  return;
}
