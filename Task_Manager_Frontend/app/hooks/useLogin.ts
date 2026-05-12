import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../services/authServices/loginService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await loginService(email, password);
      setError("");
      router.push("/home");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    login,
    error,
  };
}
