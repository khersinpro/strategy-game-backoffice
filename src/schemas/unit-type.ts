import { z } from "zod";

export const UnitTypeUpdateSchema = z.object({
    type: z.string().min(4, 'Le type doit avoir au minimum 4 caractères')
        .refine(str => str.trim() !== '', {
            message: 'Le nom ne doit pas être vide',
            path: ['name']
        }),
})

export const UnitTypeCreateSchema = z.object({
    type: z.string().min(4, 'Le type doit avoir au minimum 4 caractères')
        .refine(str => str.trim() !== '', {
            message: 'Le type ne doit pas être vide',
            path: ['type']
        }),
})