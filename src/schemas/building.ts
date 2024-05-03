import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const updateBuildingSchema = z.object({
    name: isValidStringLength(3, 30, 'name')
});