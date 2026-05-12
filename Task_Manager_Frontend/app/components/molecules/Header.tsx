"use client";
import Text from "../atoms/Text";
import Logo from "../atoms/Logo";
import Link from "next/link";

type HeaderProps = {
  welcomeMessage: string;
};

export default function Header({ welcomeMessage }: HeaderProps) {
  return (
    <header className="relative w-full h-[64px] md:h-[74px] bg-gray-400 border-b border-gray-200 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-3">
        <Logo className="hidden md:flex w-8 h-8 md:w-10 md:h-10" />

        <span className="hidden md:block text-white font-bold text-xl">
          TaskBoard App
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 max-w-[50%] text-center">
        <Link href="/home">
          <Text
            variant="title"
            className="text-white text-sm md:text-base lg:text-2xl hover:text-gray-200 truncate"
          >
            {welcomeMessage}
          </Text>
        </Link>
      </div>
    </header>
  );
}
