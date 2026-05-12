"use client";

import Footer from "../../components/molecules/Footer";
import Header from "../../components/molecules/Header";
import { useProfile } from "../../hooks/useProfile";
import SideMenu from "../molecules/SideMenu";

type WrapperProps = {
  children: React.ReactNode;
  onMain?: boolean;
};

export default function Wrapper({ children, onMain = false }: WrapperProps) {
  const { user, loading } = useProfile();

  const name = (() => {
    if (loading) return " ";
    if (user?.firstname) return `${user.firstname} ${user.lastname}`;
    return "Guest";
  })();

  return (
    <div className=" flex flex-col h-screen flex flex-col overflow-hidden">
      <Header welcomeMessage={"Welcome to the TaskBoard App"} />

      <div className="flex flex-1 min-h-0">
        {name !== "Guest" && name !== " " && (
          <div className="md:flex">
            <SideMenu name={name} onMain={onMain} />
          </div>
        )}

        <main className="flex-1 min-h-0 flex flex-col bg-gradient-to-t from-gray-400 to-gray-200">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
