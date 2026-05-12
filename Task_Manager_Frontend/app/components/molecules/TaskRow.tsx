import Link from "next/link";
import { Task } from "../../types/TaskType";

type TaskRowProps = {
  task: Task;
};

export default function TaskRow({ task }: TaskRowProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition">
      <div className="flex flex-col min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 break-words">
          {task.title}
        </h3>

        <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:gap-4 gap-1 mt-1">
          <span>Due: {task.dueDate.split("T")[0]}</span>
          <span>Status: {task.status}</span>
        </div>
      </div>

      <div className="sm:ml-auto">
        <Link
          href={`/task/${task.id}`}
          className="inline-block text-sm text-gray-600 hover:text-gray-900 hover:underline transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
