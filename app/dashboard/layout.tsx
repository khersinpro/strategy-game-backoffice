import BreadCrumb from "@/components/breadcrumb";
import AuthHeader from "@/components/layouts/auth-header";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";


export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <SessionProvider>
      <AuthHeader>
          <BreadCrumb />
          {children}
      </AuthHeader>
    </SessionProvider>
  );
}