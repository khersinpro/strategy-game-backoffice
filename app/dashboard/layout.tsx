import AuthHeader from "@/components/layouts/auth-header";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <AuthHeader>
        {children}
    </AuthHeader>
  );
}