'use client'
import { z } from "zod"
import React, { useState, useCallback } from "react"
import { loginFormErrors } from "@/src/types/login-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import { TriangleAlert } from "lucide-react"
import PublicHeader from "@/components/layouts/public-header"
import { signIn } from "next-auth/react"
import { LoginFormSchema } from "@/src/schemas/login"
import { ReloadIcon } from "@radix-ui/react-icons"
import { handleZodError } from "@/src/utils/zod"

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<loginFormErrors>({})
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  /**
   * handleLogin is a function that handles the login process
   */
  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setLoading(true)
      LoginFormSchema.parse({ email, password });
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      setLoading(false)

      if (result && result.error) {
        setErrors({
          general: result.error
        })
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      setLoading(false)
      if (error instanceof z.ZodError) {
        setErrors(handleZodError(error))
      } else {
        setErrors({
          general: error.message
        })
      }
    }
  }, [email, password, router])

  return (
    <PublicHeader>
      <div className="w-full flex flex-1 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex flex-1 items-center justify-center py-12">
          <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm ml-2">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p className="text-red-500 text-sm ml-2">{errors.password}</p>}
              </div>
              {errors.general &&
                <Alert variant="destructive">
                  <TriangleAlert className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errors.general}
                  </AlertDescription>
                </Alert>
              }
              {
                loading ? (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                )
              }
            </div>
          </form>
        </div>
        <div className="hidden bg-black lg:block relative overflow-hidden">
          <Image
            src="/fake_login_bg.jpg"
            alt="Image"
            width="1080"
            height="1920"
            className="absolute h-auto w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </PublicHeader>
  )
}