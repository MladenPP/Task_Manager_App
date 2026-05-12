"use client";

import Input from "../atoms/Input";

type Props = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  setFirstname: (val: string) => void;
  setLastname: (val: string) => void;
  setPhone: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
};

export default function RegisterFields({
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
}: Props) {
  return (
    <>
      <Input
        type="text"
        placeholder="First name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Last name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />

      <Input
        type="tel"
        placeholder="+381xx xxxx xxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Input
        type="email"
        placeholder="example@gmail.com"
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
