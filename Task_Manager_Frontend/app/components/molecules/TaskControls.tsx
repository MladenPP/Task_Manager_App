"use client";

import Input from "../atoms/Input";
import Select from "../atoms/Select";
import { TaskStatus } from "../../types/TaskStatus";
import Label from "../atoms/Label";
import { toSortBy } from "../../types/toSortBy";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: TaskStatus | "";
  setStatus: (value: TaskStatus | "") => void;

  sort: toSortBy;
  setSort: (value: toSortBy) => void;
};

export default function TaskControls({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {
  return (
    <div className="w-full px-4 md:px-10 pt-2 pb-2 flex flex-col md:flex-row md:items-end gap-4">
      <div className="flex-1 min-w-[200px]">
        <Label>Search</Label>
        <Input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full md:w-[180px] flex flex-col gap-1">
        <Label>Status</Label>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          {Object.values(TaskStatus).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>

      <div className="w-full md:w-[180px] flex flex-col gap-1">
        <Label>Sort by</Label>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as toSortBy)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md"
        >
          <option value="dueDate">Due date</option>
          <option value="title">Title</option>
        </Select>
      </div>
    </div>
  );
}
