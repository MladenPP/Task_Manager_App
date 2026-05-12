import apiClient from "../apiClient";

export async function loginService(email: string, password: string) {
  const res = await apiClient.post("auth/login", { email, password });

  return res.data;
}
