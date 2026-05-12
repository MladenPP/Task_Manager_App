import { TaskStatus } from "../../types/TaskStatus";
import { Task } from "../../types/TaskType";
import { useDroppable } from "@dnd-kit/core";
import Link from "next/link";
import TaskCard from "./TaskCard";
import Text from "../atoms/Text";
import { usePathname } from "next/navigation";

type Props = {
  status: TaskStatus;
  tasks: Task[];
  loading: boolean;
  title: string;
  activeTaskId?: string | null;
};

export default function Column({
  status,
  tasks,
  loading,
  title,
  activeTaskId,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  const pathname = usePathname();

  return (
    <div
      ref={setNodeRef}
      className={`
        min-w-[280px]
        flex-shrink-0
        bg-gray-50
        border border-gray-200
        rounded-lg
        p-4
        flex flex-col gap-3
        transition
        md:flex-1
        md:min-w-0
        

        max-h-[700px] 

        ${isOver ? "ring-2 ring-gray-900 bg-gray-100" : ""}
        `}
    >
      <Text className="text-center text-gray-700 ">{title}</Text>

      {status === TaskStatus.BACKLOG && (
        <Link
          href={`${pathname}/addtask`}
          className="
            text-sm text-gray-600 hover:text-gray-900
            text-center hover:bg-gray-200
            rounded-md py-2 transition
          "
        >
          + Add New Task
        </Link>
      )}

      <div className="flex flex-col gap-3 mt-2 overflow-y-auto flex-1 flex overflow-x-hidden">
        {tasks
          .filter((task) => task.id !== activeTaskId)
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>

      {loading && (
        <p className="text-xs text-gray-400 text-center">Loading...</p>
      )}
    </div>
  );
}
