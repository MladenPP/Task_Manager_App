"use client";

import { createContext, useContext, useState } from "react";

type View = "board" | "list";

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
  toggleView: () => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("board");

  const toggleView = () => {
    setView((prev) => (prev === "board" ? "list" : "board"));
  };

  return (
    <ViewContext.Provider value={{ view, setView, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within ViewProvider");
  }
  return context;
}
