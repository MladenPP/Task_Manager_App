import Link from "next/link";
import { Board } from "../../types/BoardType";

type Props = {
  board: Board;
};

export default function BoardCard({ board }: Props) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition">
      <div className="flex flex-col min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 break-words">
          {board.name}
        </h3>
      </div>

      <div className="sm:ml-auto">
        <Link
          href={`/board/${board.id}`}
          className="inline-block text-sm text-gray-600 hover:text-gray-900 hover:underline transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
