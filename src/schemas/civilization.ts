import { z } from "zod";

export const CivilizationUpdateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères'),
})

export const CivilizationCreateSchema = z.object({
    name: z.string().min(4, 'Le nom doit avoir au minimum 4 caractères'),
})