import { string, z } from "zod"

/**
 * Transforms a ZodError into an object where keys are error paths and values are error messages.
 * 
 * @param error - A ZodError instance to handle.
 * @returns An object where keys are error paths and values are error messages.
 */
export const handleZodError = (error: z.ZodError): Record<string, string> => {
    const errorData: Record<string, string> = {}
    error.errors.map((err) => {
        errorData[err.path[0]] = err.message
    })
    return errorData
}

/**
 * Check if a trimmed string has a length between min and max for zod.refine.
 * @param min - The minimum length of the string.
 * @param max - The maximum length of the string.
 * @param path - The path of the string in the schema.
 */
export const isValidStringLength = (min: number, max: number, path: string) => z.string().refine(str =>
    str.trim().length >= min && str.trim().length <= max, {
    message: `La longueur de ${path} doit être comprise entre ${min} et ${max} caractères`,
    path: [path]
})


