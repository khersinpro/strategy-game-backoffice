import BreadCrumb from "@/components/breadcrumb";
import AuthHeader from "@/components/layouts/auth-header";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  return (
    <AuthHeader>
        <BreadCrumb />
        {children}
    </AuthHeader>
  );
}