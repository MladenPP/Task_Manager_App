import { User } from "../../types/UserType";
import apiClient from "../apiClient";

export async function getBoardUsersService(id: string): Promise<User[]> {
  const res = await apiClient.get(`user/board/${id}`);

  return res.data;
}
