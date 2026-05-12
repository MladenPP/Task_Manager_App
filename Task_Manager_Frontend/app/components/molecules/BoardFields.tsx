"use client";

import Input from "../atoms/Input";

type Props = {
  name: string;
  setName: (val: string) => void;
};

export default function BoardFields({ name, setName }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
