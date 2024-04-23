import { z } from "zod";

export const ServerUpdateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères'),
})

export const ServerCreateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères'),
})