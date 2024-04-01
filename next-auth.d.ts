import NextAuth, { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
export type ExtendedUser = DefaultSession["user"] & {
    role_name: string;
    username: string;
    email: string;
    token: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
