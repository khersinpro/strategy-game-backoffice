import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CivilizationUpdateSchema = z.object({
    name: isValidStringLength(4, 30, 'name')
})

export const CivilizationCreateSchema = z.object({
    name: isValidStringLength(4, 30, 'name'),
})