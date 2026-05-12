type ButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

export default function DeleteButton({
  children,
  loading = false,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="text-sm text-red-600 hover:text-red-800 text-center hover:bg-red-100 rounded-lg"
      >
        {children}
      </button>
    </>
  );
}
