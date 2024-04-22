import { z } from "zod"

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