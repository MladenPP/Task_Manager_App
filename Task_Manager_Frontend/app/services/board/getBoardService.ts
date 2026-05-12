import { Board } from "../../types/BoardType";
import apiClient from "../apiClient";

export async function getBoardService(id: string): Promise<Board> {
  const res = await apiClient.get(`board/${id}`);

  return res.data;
}
