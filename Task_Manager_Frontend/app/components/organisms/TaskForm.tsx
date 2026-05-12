"use client";

import { useAddTask } from "../../hooks/useAddTask";
import TaskFields from "../molecules/TaskFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useEffect, useState } from "react";
import Link from "next/link";
import DescriptionField from "../molecules/DescriptionField";
import UserSelect from "../molecules/UserSelect";

type TaskCreateProps = {
  id: string;
};

export default function TaskForm({ id }: TaskCreateProps) {
  const {
    title,
    dueDate,
    description,
    setTitle,
    setDueDate,
    boardUsers,
    user,
    setUser,
    getBoardUsers,
    setDescription,
    addTask,
    error2,
  } = useAddTask();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBoardUsers(id);
  }, [id, getBoardUsers]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask(id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[var(--app-height)] px-10">
      <div className="flex items-center justify-center order-1 md:order-2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[600px] bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col gap-4"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Task</h1>

          <TaskFields
            title={title}
            dueDate={dueDate}
            setTitle={setTitle}
            setDueDate={setDueDate}
            isExisting={false}
            isEditing={true}
          />

          <UserSelect
            boardUsers={boardUsers}
            selectedUserId={user?.id ? String(user.id) : ""}
            setSelectedUserId={(id) => {
              const selected = boardUsers.find((u) => String(u.id) === id);

              if (selected) {
                setUser(selected);
              }
            }}
          />

          <ErrorMessage message={error2} />

          <div className="flex flex-col gap-3 mt-2">
            <Button loading={loading}>Add Task</Button>
          </div>

          <Link
            href="/home"
            className="text-sm text-gray-600 hover:text-gray-900 text-center hover:bg-gray-200 rounded-lg"
          >
            Home
          </Link>
        </form>
      </div>

      <div className="flex items-center justify-center order-2 md:order-1">
        <DescriptionField
          description={description}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
}
