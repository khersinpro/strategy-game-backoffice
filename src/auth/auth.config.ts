import axios from "axios";
import type { NextAuthConfig } from "next-auth";
import type { Credentials, User } from "@/src/types/Auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export const authConfig = {
    providers: [
        {
            id: 'credentials',
            name: 'Credentials',
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials: Credentials) => {
                try {
                    const response = await axios.post("http://localhost:3000/api/login", { 
                        email: credentials.email, 
                        password: credentials.password
                    })
                    const token: string = response.data.token
    
                    const userResponse = await axios.get("http://localhost:3000/api/user/me", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
    
                    const user: User = {...userResponse.data, token}

                    if(user) {
                        return user
                    } else {
                        return null
                    }
                } catch (error) {   
                    throw new Error("Invalid credentials")
                }
            }
        },
    ],
    session: {
        jwt: true,
        maxAge: 8 * 60 * 60,
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    pages: {
        signIn: '/',
        signOut: '/auth/signout',
    }
} satisfies NextAuthConfig

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authConfig)
}