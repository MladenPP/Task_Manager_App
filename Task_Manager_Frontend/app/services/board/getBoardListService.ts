import { Board } from "../../types/BoardType";
import apiClient from "../apiClient";

export async function getBoardListService(): Promise<Board[]> {
  const res = await apiClient.get("board");

  return res.data;
}
