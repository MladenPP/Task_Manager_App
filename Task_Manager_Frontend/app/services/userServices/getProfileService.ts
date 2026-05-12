import { User } from "../../types/UserType";
import apiClient from "../apiClient";

export async function getProfileService(): Promise<User> {
  const res = await apiClient.get("user/me");
  return res.data;
}
