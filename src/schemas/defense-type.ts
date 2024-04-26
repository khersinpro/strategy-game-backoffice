import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateDefenseTypeShema = z.object({
    unit_name: isValidStringLength(4, 20, 'unit_name'),
    type: isValidStringLength(4, 20, 'type'),
    defense_value: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.')
})

export const UpdateDefenseTypeShema = z.object({
    unit_name: isValidStringLength(4, 20, 'unit_name').optional(),
    type: isValidStringLength(4, 20, 'type').optional(),
    defense_value: z.number().int('Ce cham doit être un entier.').positive('Ce champ doit être un entier positif.').optional()
})
