import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const ServerUpdateSchema = z.object({
    name: isValidStringLength(4, 30, 'name')
})

export const ServerCreateSchema = z.object({
    name: isValidStringLength(4, 30, 'name')
})