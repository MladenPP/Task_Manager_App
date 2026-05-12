"use client";

import { useLogout } from "../../hooks/useLogout";
import ErrorMessage from "./ErrorMessage";

export default function LogoutButton() {
  const { logout, error } = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleLogout}
        className="
          text-sm px-4 py-2 rounded-md
          bg-white text-black
          hover:bg-gray-300
          transition
        "
      >
        Log out
      </button>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}
