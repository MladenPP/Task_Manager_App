import { CheckSquare } from "lucide-react";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return <CheckSquare className={`text-white ${className}`} strokeWidth={2} />;
}
