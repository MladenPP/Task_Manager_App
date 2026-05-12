type TextProps = {
  children: React.ReactNode;
  variant?: "title" | "description" | "app" | "welcome";
  className?: string;
};

const variantClasses: Record<NonNullable<TextProps["variant"]>, string> = {
  title: "text-2xl font-bold",
  description: "text-base text-gray-600",
  app: "text-sm text-gray-800",
  welcome: "text-white",
};

export default function Text({
  children,
  variant = "app",
  className = "",
}: TextProps) {
  return (
    <p className={`${variantClasses[variant]} ${className}`}>{children}</p>
  );
}
