import { User } from "@/app/types/UserType";
import apiClient from "../apiClient";

export async function getAllUsersService(): Promise<User[]> {
  const res = await apiClient.get("user");

  return res.data;
}
