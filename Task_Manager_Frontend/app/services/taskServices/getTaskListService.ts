import { toSortBy } from "../../types/toSortBy";
import { TaskStatus } from "../../types/TaskStatus";
import { Task } from "../../types/TaskType";
import apiClient from "../apiClient";

type paramsType = {
  boardId: string;
  search?: string;
  status?: TaskStatus;
  toSortBy?: toSortBy;
  page?: number;
  pageSize?: number;
};

export async function getTaskListService(
  boardId: string,
  search?: string,
  status?: TaskStatus | "",
  toSortBy?: toSortBy,
  page?: number,
  pageSize?: number,
  signal?: AbortSignal,
): Promise<{ tasks: Task[]; total: number }> {
  const params: paramsType = { boardId: boardId };

  if (search) params.search = search;
  if (status) params.status = status;
  if (toSortBy) params.toSortBy = toSortBy;
  if (page) params.page = page;
  if (pageSize) params.pageSize = pageSize;

  const res = await apiClient.get("/task", {
    params,
    signal,
  });

  return res.data;
}
