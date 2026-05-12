"use client";

import { useChangePassword } from "../../hooks/useChangePassword";

import ChangePasswordFields from "../molecules/ChangePasswordFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

export default function ChangePasswordForm() {
  const {
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    changePassword,
    error,
  } = useChangePassword();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    changePassword();
  };

  return (
    <div className="w-full max-w-[500px]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Change Password
        </h1>

        <ChangePasswordFields
          oldPassword={oldPassword}
          newPassword={newPassword}
          setOldPassword={setOldPassword}
          setNewPassword={setNewPassword}
        />

        <Button>Change password</Button>

        <ErrorMessage message={error} />
      </form>
    </div>
  );
}
