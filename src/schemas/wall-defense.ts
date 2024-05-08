import { z } from "zod";

export const updateWallDefenseSchema = z.object({
    defense_percent: z.number().int('Ce champ doit être un entier').positive('Ce champ doit être positif')
})