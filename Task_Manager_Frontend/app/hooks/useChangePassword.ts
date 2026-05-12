import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePasswordService } from "../services/authServices/changePasswordService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const changePassword = async () => {
    try {
      await changePasswordService(oldPassword, newPassword);
      setError("");
      router.push("/home");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  return {
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    changePassword,
    error,
  };
}
