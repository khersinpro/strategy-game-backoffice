import dynamic from "next/dynamic";
const AuthLayout = dynamic(() => import("@/components/layouts/auth-layout"));
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function AuthenticatedLayout({ children }: PropsWithChildren<{}>) {
  return (
    <SessionProvider>
      <AuthLayout>
        {children}
      </AuthLayout>
    </SessionProvider>
  );
}