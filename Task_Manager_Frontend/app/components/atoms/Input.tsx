"use client";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`
        w-full px-3 py-2 text-sm
        border border-gray-300 rounded-md
        bg-white
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
        transition
        disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
      `}
    />
  );
}
