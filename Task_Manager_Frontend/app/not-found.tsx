"use client";
import { redirect } from "next/navigation";
import { useProfile } from "./hooks/useProfile";

export default function NotFound() {
  const { user } = useProfile();

  if (user) {
    redirect("/home");
  }

  return (
    <div>
      <h1>404 - Page not found</h1>
    </div>
  );
}
