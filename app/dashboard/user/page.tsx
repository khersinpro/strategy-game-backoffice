'use client'
import { Card } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"


export default function Dashboard() {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user)
    }
  }, [session])
  
  return (
    <>
      <Card>
        <p>Welcome, {user?.username}</p>
        <p>Email, {user?.email}</p>
        <p>Role, {user?.role_name}</p>
        <p style={{wordBreak: 'break-word'}}>Token, {user?.token}</p>
      </Card>
    </>
  )
}
