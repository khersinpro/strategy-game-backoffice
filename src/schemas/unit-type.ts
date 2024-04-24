import { z } from "zod";

export const UnitTypeUpdateSchema = z.object({
    type: z.string().min(4, 'Le type doit avoir au minimum 4 caractères'),
})

export const UnitTypeCreateSchema = z.object({
    type: z.string().min(4, 'Le type doit avoir au minimum 4 caractères'),
})