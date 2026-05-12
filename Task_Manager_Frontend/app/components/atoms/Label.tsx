"use client";

type Props = {
  children: React.ReactNode;
};

export default function Label({ children }: Props) {
  return <label>{children}</label>;
}
