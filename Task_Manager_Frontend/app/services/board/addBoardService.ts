import { Board } from "../../types/BoardType";
import apiClient from "../apiClient";

export async function addBoardService(name: string): Promise<Board> {
  const res = await apiClient.post("board", {
    name,
  });

  return res.data;
}
