"use client";

import { User } from "../../types/UserType";
import Label from "../atoms/Label";
import Select from "../atoms/Select";

type Props = {
  boardUsers: User[];
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;
};

export default function UserSelect({
  boardUsers,
  selectedUserId,
  setSelectedUserId,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Label>Assign User</Label>

      <Select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="
          border border-gray-300 rounded-md
          px-3 py-2 bg-white text-sm
          focus:outline-none focus:ring-2 focus:ring-gray-400
        "
      >
        <option value="">Select User</option>

        {boardUsers?.map((user) => (
          <option key={user.id} value={String(user.id)}>
            {user.firstname} {user.lastname}
          </option>
        ))}
      </Select>
    </div>
  );
}
