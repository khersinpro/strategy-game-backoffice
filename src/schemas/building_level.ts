import { z } from "zod";
import { isValidStringLength } from "../utils/zod";


export const createBuildingLevel = z.object({
    building_name: isValidStringLength(3, 50, 'building_name'),
    time: z.number().int("Ce champ doit être un entier.").positive("Ce champ doit être positif."),
});

export const updateBuildingLevel = z.object({
    time: z.number().int("Ce champ doit être un entier.").positive("Ce champ doit être positif.").optional(),
});