"use client";

import Link from "next/link";
import LogoutButton from "../atoms/LogoutButton";
import Text from "../atoms/Text";
import { useState } from "react";
import Button from "../atoms/Button";
import ViewToggleButton from "../atoms/ViewToggleButton";

type SideMenuProps = {
  name?: string;
  onMain?: boolean;
};

export default function SideMenu({ name, onMain }: SideMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen((p) => !p)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-500 text-white px-3 py-2 rounded-md"
      >
        {open ? "✕" : "☰"}
      </Button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          w-64 bg-gray-400 border-r border-gray-300
          flex flex-col p-4 gap-3

          h-full

          fixed top-0 left-0 z-50
          transform transition-transform duration-300

          md:static md:translate-x-0 md:h-auto md:z-auto

          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="flex flex-col gap-2">
          <Text variant="title" className="text-white text-xl">
            {name}
          </Text>

          <Link
            href="/home"
            onClick={() => setOpen(false)}
            className="text-white bg-gray-500 px-3 py-2 rounded-md"
          >
            Home
          </Link>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="text-white bg-gray-500 px-3 py-2 rounded-md"
          >
            Profile
          </Link>

          {onMain && <ViewToggleButton />}
        </nav>

        <div className="flex-1" />

        <LogoutButton />
      </aside>
    </>
  );
}
