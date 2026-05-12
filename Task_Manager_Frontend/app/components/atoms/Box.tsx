type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Box({ children, className = "" }: BoxProps) {
  return (
    <div
      className={`bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
