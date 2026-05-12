"use client";

import { useState } from "react";

import { useBoard } from "../../hooks/useBoard";

import BoardFields from "../molecules/BoardFields";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

export default function BoardForm() {
  const { addBoard, error } = useBoard();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addBoard(name);
      setName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[340px] lg:w-[380px] border-l border-gray-300 bg-gray-100/80 backdrop-blur-sm p-4 md:p-6 flex-shrink-0">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold text-gray-900">Create Board</h1>

        <BoardFields name={name} setName={setName} />

        <ErrorMessage message={error} />

        <div className="flex flex-col gap-3 mt-2">
          <Button loading={loading}>Add Board</Button>
        </div>
      </form>
    </div>
  );
}
