import { z } from "zod";

export const updateBuildingCostSchema = z.object({
    quantity: z.number().int("Ce champ doit être un entier.").positive("Ce champ doit être positif."),
});
