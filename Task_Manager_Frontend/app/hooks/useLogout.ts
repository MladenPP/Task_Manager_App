import { useState } from "react";
import { logoutService } from "../services/authServices/logoutService";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useLogout() {
  const [error, setError] = useState("");
  const router = useRouter();
  const logout = async () => {
    try {
      await logoutService();
      router.push("/login");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  return { logout, error };
}
