import { z } from "zod";

export const updateResourceProductionSchema = z.object({
    production: z.number().int('Ce champ doit être un entier').positive('Ce champ doit être positif'),
})