import apiClient from "../apiClient";

export async function changeUserService(
  firstname: string,
  lastname: string,
  phone: string,
): Promise<void> {
  await apiClient.patch("user", { firstname, lastname, phone });

  return;
}
