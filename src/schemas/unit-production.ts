import { z } from "zod";

export const updateUnitProductionSchema = z.object({
    reduction_percent: z.number().int('Ce champ doit être un entier').positive('Ce champ doit être positif')
})