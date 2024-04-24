import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const UnitTypeUpdateSchema = z.object({
    type: isValidStringLength(4, 30, 'type')
})

export const UnitTypeCreateSchema = z.object({
    type: isValidStringLength(4, 30, 'type'),
})