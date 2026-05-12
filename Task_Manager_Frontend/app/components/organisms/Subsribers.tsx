"use client";

import { useCallback, useEffect, useState } from "react";

import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

import { useBoard } from "../../hooks/useBoard";
import { useUser } from "@/app/hooks/useUser";
import { useProfile } from "@/app/hooks/useProfile";
import { UserRole } from "@/app/types/UserRole";
import UserSelect from "../molecules/UserSelect";
import SubscriberList from "../molecules/SubscriberList";

type Props = {
  boardId: string;
};
export default function Subscribers({ boardId }: Props) {
  const { addUserToBoard, removeUserFromBoard, error } = useBoard();
  const { user } = useProfile();

  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState("");

  const { getBoardUsers, boardUsers, users, getUsers } = useUser();

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      await getUsers();
      await getBoardUsers(boardId);
    } finally {
      setLoading(false);
    }
  }, [getUsers, getBoardUsers, boardId]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAddUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId.trim()) return;

    try {
      setAdding(true);

      await addUserToBoard(boardId, userId);

      setUserId("");

      await loadUsers();
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveUser = async (id: string) => {
    try {
      setRemovingId(id);

      await removeUserFromBoard(boardId, id);

      await loadUsers();
    } finally {
      setRemovingId("");
    }
  };

  const availableUsers = users.filter(
    (u) => !boardUsers.some((bu) => bu.id === u.id),
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[700px] mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>

        {user.role === UserRole.ADMIN && (
          <form onSubmit={handleAddUser} className="flex flex-col gap-3">
            <UserSelect
              boardUsers={availableUsers}
              selectedUserId={userId}
              setSelectedUserId={setUserId}
            />

            <Button loading={adding}>Add Subscriber</Button>
          </form>
        )}

        <ErrorMessage message={error} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Current Subscribers
        </h2>

        {loading ? (
          <div className="text-sm text-gray-500">Loading subscribers...</div>
        ) : boardUsers.length === 0 ? (
          <div className="text-sm text-gray-500">No subscribers found.</div>
        ) : (
          <SubscriberList
            boardUsers={boardUsers}
            removingId={removingId}
            handleRemoveUser={handleRemoveUser}
          />
        )}
      </div>
    </div>
  );
}
