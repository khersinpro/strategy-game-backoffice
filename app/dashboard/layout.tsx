import AuthHeader from "@/components/layouts/AuthHeader";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <AuthHeader>
        {children}
    </AuthHeader>
  );
}