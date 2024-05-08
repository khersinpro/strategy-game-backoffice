import { z } from "zod";

export const updatePopulationCapacityShema = z.object({
    capacity: z.number().int('Ce champ doit être un entier').positive('Ce champ doit être positif'),
})
