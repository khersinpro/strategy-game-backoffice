import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateUnitShema = z.object({
    name: isValidStringLength(4, 20, 'name'),
    attack: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.'),
    carrying_capacity: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.'),
    movement_speed: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.'),
    population_cost: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.'),
    training_time: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.'),
    unit_type: isValidStringLength(4, 20, 'unit_type'),
    civilization_name: isValidStringLength(4, 20, 'civilization_name'),
    military_building_name: isValidStringLength(4, 20, 'military_building_name')
})

export const UpdateUnitShema = z.object({
    name: isValidStringLength(4, 20, 'name').optional(),
    attack: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.').optional(),
    carrying_capacity: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.').optional(),
    movement_speed: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.').optional(),
    population_cost: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.').optional(),
    training_time: z.number().int('Ce champ doit être un entier.').positive('Ce champ doit être un entier positif.').optional(),
    unit_type: isValidStringLength(4, 20, 'unit_type').optional(),
    civilization_name: isValidStringLength(4, 20, 'civilization_name').optional(),
    military_building_name: isValidStringLength(4, 20, 'military_building_name').optional()
})
