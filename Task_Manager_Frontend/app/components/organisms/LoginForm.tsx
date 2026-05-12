"use client";

import { useLogin } from "../../hooks/useLogin";
import LoginFields from "../molecules/LoginFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import Link from "next/link";

export default function LoginForm() {
  const { email, password, setEmail, setPassword, login, error } = useLogin();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <LoginFields
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />

          <Button>Login</Button>

          <ErrorMessage message={error} />

          <Link
            href="/register"
            className="text-sm text-gray-600 hover:text-gray-900 text-center"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
