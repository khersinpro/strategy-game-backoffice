'use client'

import axios, { AxiosError } from "axios"
import { set, z } from "zod"
import React, { useState, useCallback, useEffect } from "react"
import { loginFormErrors, LoginRequestError } from "@/src/types/LoginForm"
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
import { useAuth } from "@/src/auth/AuthContext"
import Header from "@/components/layouts/Header"

const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 8 characters'),
})

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<loginFormErrors>({})
  const router = useRouter()
  const { setUser, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      return router.push('/');
    }
  }, [isAuthenticated, router]);

  /**
   * handleZodError is a function that handles ZodError
   * @param error ZodError
   */
  const handleZodError = useCallback((error: z.ZodError) => {
    const errorData: loginFormErrors = {}
    error.errors.map((err) => {
      if (err.path[0] === 'email') {
        errorData.email = err.message
      } else if (err.path[0] === 'password') {
        errorData.password = err.message
      }
    })
    setErrors(errorData)
  }, [])

  /**
   * handleAxiosError is a function that handles AxiosError<LoginRequestError>
   * @param error AxiosError<LoginRequestError>
   */
  const handleAxiosError = useCallback((error: AxiosError<LoginRequestError>) => {
    if (error.response && error.response.data) {
      const errorData: LoginRequestError = error.response.data
      if (errorData.errors) {
        setErrors({
          email: errorData.errors.email?.msg,
          password: errorData.errors.password?.msg
        })
      } else if (errorData.error) {
        setErrors({
          general: errorData.error
        })
      }
    } else {
      setErrors({
        general: 'An error occurred. Please try again later.'
      })
    }
  }, [])

  /**
   * handleLogin is a function that handles the login process
   */
  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      LoginFormSchema.parse({ email, password });

      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      })

      const token: string = response.data.token

      localStorage.setItem("token", token)

      const user = await axios.get("http://localhost:3000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(user.data)
      router.push('/')
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        handleZodError(error)
      } else {
        handleAxiosError(error)
      }
    }
  }, [email, password, handleZodError, handleAxiosError, router, setUser])

  return (
    <Header>

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
              <Button type="submit" className="w-full">
                Login
              </Button>
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
    </Header>
  )
}