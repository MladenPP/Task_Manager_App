"use client";

import { useProfile } from "../../hooks/useProfile";
import UserFields from "../molecules/UserFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteButton from "../atoms/DeleteButton";
import ConfirmDialog from "../molecules/ConfirmDialog";

export default function UserForm() {
  const {
    user,
    isEditing,
    setUser,
    setIsEditing,
    changeUser,
    deleteUser,
    error,
  } = useProfile();

  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await changeUser()) {
      setIsEditing(false);
    }
  };

  const handleDeleteUser = async () => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser();
    } finally {
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <div className="w-full max-w-[600px]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>

        <UserFields user={user} isEditing={isEditing} setUser={setUser} />

        <ErrorMessage message={error} />

        <div className="flex flex-col gap-3 mt-2">
          {!isEditing && (
            <Button>
              <span
                className="w-full h-full block"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </span>
            </Button>
          )}

          {isEditing && <Button>Submit</Button>}

          <DeleteButton onClick={handleDeleteUser} loading={loading}>
            Delete your profile
          </DeleteButton>

          <Link
            href="/home"
            className="text-sm text-gray-600 hover:text-gray-900 text-center hover:bg-gray-200 rounded-lg"
          >
            Home
          </Link>
        </div>
      </form>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete your profile?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
        destructive
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
