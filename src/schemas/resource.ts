import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const ResourceUpdateSchema = z.object({
    name: isValidStringLength(4, 30, 'name')
})

export const ResourceCreateSchema = z.object({
    name: isValidStringLength(4, 30, 'name'),
})