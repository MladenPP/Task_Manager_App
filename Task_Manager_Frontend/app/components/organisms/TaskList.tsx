"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Task } from "../../types/TaskType";
import ErrorMessage from "../atoms/ErrorMessage";
import TaskRow from "../molecules/TaskRow";
import TaskControls from "../molecules/TaskControls";
import { getTaskListService } from "../../services/taskServices/getTaskListService";
import { TaskStatus } from "../../types/TaskStatus";
import { toSortBy } from "../../types/toSortBy";
import { useDebounce } from "../../hooks/useDebounce";
import PageControls from "../molecules/PageControls";
import { getErrorMessage } from "../../utility/errorHandlers/getErrorMessage";
import { socket } from "../../lib/socket";
import { useParams } from "next/navigation";

type Props = {
  error: string;
  loading: boolean;
  setError: Dispatch<SetStateAction<string>>;
};

export default function TaskList({ error, loading, setError }: Props) {
  const params = useParams();
  const id = params.id as string;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [sort, setSort] = useState<toSortBy>(toSortBy.DUE_DATE);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const debouncedSearch = useDebounce(search, 600);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  const pageSize = 8;

  const prevFiltersRef = useRef({
    search: "",
    status: "",
    sort: toSortBy.DUE_DATE,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    listRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    socket.on("task:created", () => {
      setRefresh((prev) => prev + 1);
    });

    socket.on("task:updated", (updatedTask: Task) => {
      setFilteredTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    });

    socket.on("task:deleted", () => {
      setRefresh((prev) => prev + 1);
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [setFilteredTasks]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      const filtersChanged =
        prevFiltersRef.current.search !== debouncedSearch ||
        prevFiltersRef.current.status !== status ||
        prevFiltersRef.current.sort !== sort;

      if (filtersChanged) {
        setPage(1);
      }

      prevFiltersRef.current = {
        search: debouncedSearch,
        status,
        sort,
      };

      try {
        const data = await getTaskListService(
          id,
          debouncedSearch,
          status,
          sort,
          page,
          pageSize,
          controller.signal,
        );

        setTotal(data.total);

        setFilteredTasks(data.tasks);
        setError("");
      } catch (err) {
        getErrorMessage(err, setError);
      }
    };

    fetchTasks();

    return () => controller.abort();
  }, [debouncedSearch, status, sort, page, refresh, setError]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <TaskControls
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="w-full text-sm text-gray-500 px-4 py-6">
          Loading tasks...
        </div>
      ) : (
        <div
          ref={listRef}
          className="flex flex-col gap-2 w-full px-4 md:px-10 py-6 overflow-y-auto flex-1 min-h-0"
        >
          {filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
          <PageControls
            page={page}
            setPage={handlePageChange}
            total={total}
            pageSize={pageSize}
          />
        </div>
      )}
    </div>
  );
}
