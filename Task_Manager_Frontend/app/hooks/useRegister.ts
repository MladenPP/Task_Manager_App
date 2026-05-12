import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerService } from "../services/authServices/registerService";
import { getErrorMessage } from "../utility/errorHandlers/getErrorMessage";

export function useRegister() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      await registerService(firstname, lastname, phone, email, password);
      setError("");
      router.push("/home");
    } catch (err: unknown) {
      getErrorMessage(err, setError);
    }
  };

  return {
    firstname,
    lastname,
    phone,
    email,
    password,
    setFirstname,
    setLastname,
    setPhone,
    setEmail,
    setPassword,
    register,
    error,
  };
}
