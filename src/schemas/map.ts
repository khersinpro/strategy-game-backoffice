import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const CreateMapSchema = z.object({
  server_name: isValidStringLength(4, 30, 'server_name'),
  x_area: z.number().int('Ce champ doit être un entier').min(100, 'La valeur doit être supérieure à 100'),
  y_area: z.number().int('Ce champ doit être un entier'),
})

export const UpdateMapSchema = z.object({
  server_name: isValidStringLength(4, 30, 'server_name').optional(),
  x_area: z.number().int('Ce champ doit être un entier').optional(),
  y_area: z.number().int('Ce champ doit être un entier').optional(),
})