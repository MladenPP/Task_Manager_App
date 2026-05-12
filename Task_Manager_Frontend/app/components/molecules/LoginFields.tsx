"use client";

import Input from "../atoms/Input";

type Props = {
  email: string;
  password: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
};

export default function LoginFields({
  email,
  password,
  setEmail,
  setPassword,
}: Props) {
  return (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </>
  );
}
