"use client";

import Wrapper from "../organisms/Wrapper";
import TaskBoard from "../organisms/TaskBoard";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Task } from "../../types/TaskType";
import TaskCard from "../molecules/TaskCard";

type Props = {
  tasks: Task[];
  error: string;
  loading: boolean;
  activeTask: Task | null;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
};

export default function BoardPageTemplate({
  tasks = [],
  error = "",
  loading = false,
  activeTask,
  handleDragStart,
  handleDragEnd,
}: Props) {
  return (
    <Wrapper onMain={true}>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex gap-4 w-full min-h-[var(--app-height)] px-4 md:px-10 py-6 overflow-x-auto md:overflow-visible">
          <TaskBoard
            tasks={tasks}
            error={error}
            loading={loading}
            activeTaskId={activeTask?.id}
          />
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </Wrapper>
  );
}
