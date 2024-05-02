import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateWallBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name'),
    civilization_name: isValidStringLength(4, 20, 'civilization_name'),
})

export const UpdateMilitaryBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name').optional(),
    civilization_name: isValidStringLength(4, 20, 'civilization_name').optional(),
})