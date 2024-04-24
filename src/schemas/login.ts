import { z } from "zod";
import { isValidStringLength } from "../utils/zod";

export const MapFormSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  password: isValidStringLength(4, 30, 'password')
})
