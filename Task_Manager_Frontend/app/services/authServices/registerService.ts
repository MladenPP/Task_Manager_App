import apiClient from "../apiClient";

export async function registerService(
  firstname: string,
  lastname: string,
  phone: string,
  email: string,
  password: string,
): Promise<void> {
  await apiClient.post("auth/register", {
    firstname,
    lastname,
    phone,
    email,
    password,
  });

  return;
}
