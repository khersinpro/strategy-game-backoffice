import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateStorageBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name'),
    resource_name: isValidStringLength(4, 20, 'resource_name'),
})

export const UpdateStorageBuildingShema = z.object({
    name: isValidStringLength(4, 20, 'name').optional(),
    resource_name: isValidStringLength(4, 20, 'resource_name').optional(),
})