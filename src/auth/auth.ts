import NextAuth from "next-auth"
import { authConfig } from '@/src/auth/auth.config'

const handler = NextAuth(authConfig)

export default handler

