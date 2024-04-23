import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(4, 'Le mot de passe doit avoir au minimum 4 caractères'),
})