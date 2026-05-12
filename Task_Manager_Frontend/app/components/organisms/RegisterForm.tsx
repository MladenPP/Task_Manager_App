"use client";

import { useRegister } from "../../hooks/useRegister";
import RegisterFields from "../molecules/RegisterFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const {
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
  } = useRegister();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px]">
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <RegisterFields
            firstname={firstname}
            lastname={lastname}
            phone={phone}
            email={email}
            password={password}
            setFirstname={setFirstname}
            setLastname={setLastname}
            setPhone={setPhone}
            setEmail={setEmail}
            setPassword={setPassword}
          />

          <Button loading={loading}>Register</Button>

          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 text-center"
          >
            Back to Login
          </Link>

          <ErrorMessage message={error} />
        </form>
      </div>
    </div>
  );
}
