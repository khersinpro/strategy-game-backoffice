"use client";

import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  return (
    <span onClick={() => signOut({ callbackUrl: 'http://localhost:4200/' })} className="cursor-pointer">
      {children}
    </span>
  );
};