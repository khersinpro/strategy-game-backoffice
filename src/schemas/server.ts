import { z } from "zod";

export const ServerUpdateSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
})

export const ServerCreateSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters'),
})