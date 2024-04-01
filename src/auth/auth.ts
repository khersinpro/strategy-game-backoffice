import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { AdapterUser } from "next-auth/adapters";



export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
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
    
                    const user = {...userResponse.data, token}

                    if(user) {
                        return user
                    } else {
                        return null
                    }
                } catch (error) {   
                    throw new Error("Invalid credentials")
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60,
    },
    callbacks: {
        async session({ session, token }) {
            if (session && session.user) {
             session.user = token.user as AdapterUser & User & { 
                role_name: string;
                username: string;
                email: string;
                token: string;} ;
            }
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
})



