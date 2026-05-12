import { useState } from "react";
import { Board } from "../types/BoardType";
import { getBoardService } from "../services/board/getBoardService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";
import { addBoardService } from "../services/board/addBoardService";
import { addUserBoardService } from "../services/board/addUserBoardService";
import { removeUserBoardService } from "../services/board/removeUserBoardService";

export function useBoard() {
  const [board, setBoard] = useState<Board>({
    id: "",
    name: "",
  });
  const [error, setError] = useState("");

  const getBoard = async (id: string) => {
    try {
      const board = await getBoardService(id);
      setBoard(board);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  };

  const addBoard = async (name: string) => {
    try {
      await addBoardService(name);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  };

  const addUserToBoard = async (boardId: string, userId: string) => {
    try {
      await addUserBoardService(boardId, userId);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  };

  const removeUserFromBoard = async (boardId: string, userId: string) => {
    try {
      await removeUserBoardService(boardId, userId);
      setError("");
    } catch (err) {
      getErrorMessage(err, setError);
    }
  };

  return {
    board,
    error,
    getBoard,
    addBoard,
    addUserToBoard,
    removeUserFromBoard,
  };
}
