import { useState } from "react";
import Link from "next/link";
import { Task } from "../../types/TaskType";
import { useDraggable } from "@dnd-kit/core";
import Text from "../atoms/Text";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const [flipped, setFlipped] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    pointerEvents: isDragging ? ("none" as const) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="[perspective:1000px]"
      data-dragging={isDragging ? "true" : "false"}
      onClick={() => {
        if (!isDragging) setFlipped((prev) => !prev);
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-2 [backface-visibility:hidden]">
          <div
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing"
          >
            <h3 className="text-lg font-semibold text-gray-900 break-words">
              {task.title}
            </h3>

            <div className="text-xs text-gray-500 flex flex-col gap-1 mt-1">
              <p>Due: {task.dueDate.split("T")[0]}</p>
              <p>Status: {task.status}</p>
            </div>
          </div>

          <Text className="cursor-pointer"> Click for description </Text>

          <Link
            href={`/task/${task.id}`}
            className="mt-3 text-sm text-gray-600 hover:text-gray-900 text-center hover:bg-gray-200 rounded-md py-2 transition"
            onClick={(e) => e.stopPropagation()}
          >
            View Task
          </Link>
        </div>

        <div
          className="absolute inset-0 bg-gray-200 border border-gray-200 rounded-lg shadow-sm p-5
            flex flex-col items-start justify-start text-sm text-gray-800
            [transform:rotateY(180deg)] [backface-visibility:hidden] cursor-pointer"
        >
          <div className="absolute top-3 left-5 text-base font-semibold text-gray-900">
            Description
          </div>
          <div className="pt-8 text-center break-all">{task.description}</div>
        </div>
      </div>
    </div>
  );
}
