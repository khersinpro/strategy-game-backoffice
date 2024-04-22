import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 8 characters'),
})