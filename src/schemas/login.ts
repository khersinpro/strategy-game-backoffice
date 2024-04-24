import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email('Email invalide')
    .refine(str => str.trim() !== '', {
      message: "L'email de passe ne doit pas être vide",
      path: ['email']
    }),
  password: z.string().min(4, 'Le mot de passe doit avoir au minimum 4 caractères')
    .refine(str => str.trim() !== '', {
      message: 'Le mot de passe ne doit pas être vide',
      path: ['password']
    }),
})