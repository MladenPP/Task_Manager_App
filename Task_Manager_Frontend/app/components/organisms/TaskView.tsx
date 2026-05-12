"use client";

import Link from "next/link";
import { useTask } from "../../hooks/useTask";
import TaskFields from "../molecules/TaskFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "../atoms/DeleteButton";
import DescriptionField from "../molecules/DescriptionField";
import ConfirmDialog from "../molecules/ConfirmDialog";
import UserSelect from "../molecules/UserSelect";
import { useAddTask } from "../../hooks/useAddTask";

type TaskViewProps = {
  id: string;
};

export default function TaskView({ id }: TaskViewProps) {
  const { task, error, isEditing, setTask, setIsEditing, update, deleteTask } =
    useTask(id);

  const { boardUsers, user, setUser, error2, getBoardUsersByTask } =
    useAddTask();

  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getBoardUsersByTask(id);
  }, [id, getBoardUsersByTask]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await update()) {
      setIsEditing(false);
    }
  };

  const handleDeleteTask = async () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteTask = async () => {
    setLoading(true);
    try {
      await deleteTask();
      router.push("/home");
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[var(--app-height)] px-10">
      <div className="flex items-center justify-center order-1 md:order-2">
        <form
          className="w-full max-w-[600px] bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Task</h1>

          <TaskFields
            isExisting={true}
            isEditing={isEditing}
            title={task.title}
            dueDate={formatDate(task.dueDate)}
            status={task.status}
            createdAt={formatDate(task.createdAt)}
            setTitle={(val) => setTask((prev) => ({ ...prev, title: val }))}
            setDueDate={(val) => setTask((prev) => ({ ...prev, dueDate: val }))}
            setStatus={(val) => setTask((prev) => ({ ...prev, status: val }))}
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

          <ErrorMessage message={error} />
          <ErrorMessage message={error2} />

          <div className="flex flex-col gap-3 mt-2">
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}

            {isEditing && <Button>Submit</Button>}

            <DeleteButton onClick={handleDeleteTask} loading={loading}>
              Delete task
            </DeleteButton>

            <Link
              href="/home"
              className="text-sm text-gray-600 hover:text-gray-900 text-center hover:bg-gray-200 rounded-lg"
            >
              Home
            </Link>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center order-2 md:order-1">
        <DescriptionField
          description={task.description}
          setDescription={(val) =>
            setTask((prev) => ({ ...prev, description: val }))
          }
          isEditing={isEditing}
        />
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete task?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
        destructive
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
}
