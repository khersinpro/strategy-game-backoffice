import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateResourceBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name'),
    resource_name: isValidStringLength(4, 20, 'resource_name'),
})

export const UpdateResourceBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name').optional(),
    resource_name: isValidStringLength(4, 20, 'resource_name').optional(),
})