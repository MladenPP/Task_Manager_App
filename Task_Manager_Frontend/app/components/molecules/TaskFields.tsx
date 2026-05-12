"use client";

import { TaskStatus } from "../../types/TaskStatus";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import StatusSelect from "./StatusSelect";

type BaseProps = {
  title: string;
  dueDate: string;

  setTitle: (val: string) => void;
  setDueDate: (val: string) => void;
};

type CreateProps = BaseProps & {
  isExisting: false;
  isEditing: true;
};

type EditProps = BaseProps & {
  isExisting: true;
  isEditing: boolean;
  createdAt: string;
  status: TaskStatus;
  setStatus: (val: TaskStatus) => void;
};

export type Props = CreateProps | EditProps;

export default function TaskFields(props: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Title"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          disabled={!props.isEditing}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Due Date</Label>
        <Input
          placeholder="Due Date"
          type="date"
          value={props.dueDate}
          onChange={(e) => props.setDueDate(e.target.value)}
          disabled={!props.isEditing}
        />
      </div>

      {props.isExisting && (
        <>
          <div className="flex flex-col gap-1">
            <Label>Created At</Label>
            <Input
              placeholder="Created At"
              type="date"
              value={props.createdAt}
              onChange={() => {}}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Status</Label>
            <StatusSelect
              value={props.status}
              isEditing={props.isEditing}
              onChange={props.setStatus}
            />
          </div>
        </>
      )}
    </div>
  );
}
