import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateUnitCostShema = z.object({
    unit_name: isValidStringLength(4, 20, 'unit_name'),
    resource_name: isValidStringLength(4, 20, 'resource_name'),
    quantity: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.')
})

export const UpdateUnitCostShema = z.object({
    unit_name: isValidStringLength(4, 20, 'unit_name').optional(),
    resource_name: isValidStringLength(4, 20, 'resource_name').optional(),
    quantity: z.number().int('Ce cham doit être un entier.').positive('Ce champ doit être un entier positif.').optional()
})
