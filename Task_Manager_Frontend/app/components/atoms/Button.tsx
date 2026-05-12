"use client";

type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  loading = false,
  type = "submit",
  className = `
        w-full py-2 px-4 rounded-md
        bg-gray-900 text-white
        hover:bg-gray-800
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
        text-sm font-medium
      `,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={className}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
