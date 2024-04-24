import { z } from "zod";

export const ServerUpdateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères')
        .refine(str => str.trim() !== '', {
            message: 'Le nom ne doit pas être vide',
            path: ['name']
        }),
})

export const ServerCreateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères')
        .refine(str => str.trim() !== '', {
            message: 'Le nom ne doit pas être vide',
            path: ['name']
        }),
})