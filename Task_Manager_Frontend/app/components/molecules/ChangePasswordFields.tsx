"use client";

import Input from "../atoms/Input";

type Props = {
  oldPassword: string;
  newPassword: string;
  setOldPassword: (val: string) => void;
  setNewPassword: (val: string) => void;
};

export default function ChangePasswordFields({
  oldPassword,
  newPassword,
  setOldPassword,
  setNewPassword,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>
  );
}
