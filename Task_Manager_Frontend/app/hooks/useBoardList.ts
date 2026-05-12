import { useEffect, useState } from "react";
import { Board } from "../types/BoardType";
import { getBoardListService } from "../services/board/getBoardListService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useBoardList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boards = await getBoardListService();
        setBoards(boards);
        setError("");
      } catch (err) {
        getErrorMessage(err, setError);
      }
    };
    fetchBoards();
  }, []);

  return { boards, error, setBoards };
}
