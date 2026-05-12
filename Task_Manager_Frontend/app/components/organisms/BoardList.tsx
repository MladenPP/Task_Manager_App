import BoardCard from "../molecules/BoardCard";
import { useBoardList } from "../../hooks/useBoardList";
import { useEffect } from "react";
import { socket } from "@/app/lib/socket";
import { Board } from "@/app/types/BoardType";

export default function BoardList() {
  const { boards, error, setBoards } = useBoardList();

  useEffect(() => {
    socket.on("board:created", (board: Board) => {
      setBoards((prev) => [...prev, board]);
    });

    socket.on("board:deleted", (boardId: string) => {
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
    });

    socket.on("board:useradd", (board: Board) => {
      setBoards((prev) => [...prev, board]);
    });

    socket.on("board:userremove", (boardId: string) => {
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
    });

    return () => {
      socket.off("board:created");
      socket.off("board:deleted");
    };
  }, [setBoards]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {error ? (
        <div className="w-full text-sm text-red-500 px-4 py-6">{error}</div>
      ) : boards.length === 0 ? (
        <div className="w-full text-sm text-gray-500 px-4 py-6">
          Loading boards...
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full px-4 md:px-10 py-6 overflow-y-auto flex-1 min-h-0">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}
