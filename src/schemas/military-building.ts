import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateMilitaryBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name'),
    unit_type: isValidStringLength(4, 20, 'unit_type'),
})

export const UpdateMilitaryBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name').optional(),
    unit_type: isValidStringLength(4, 20, 'unit_type').optional(),
})