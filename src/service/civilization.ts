import axios from "axios"
import { Civilization, CivilizationList } from "../types/civilization"
import { CivilizationCreateSchema, CivilizationUpdateSchema } from "../schemas/civilization"

/**
 * Fetches all civilizations.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<CivilizationList>} - A promise that resolves to a list of all civilizations.
 * @throws {Error} - Throws an error if an error occurs while retrieving the civilizations.
 */
export async function getAllCivilizations(token: string): Promise<CivilizationList> {
    try {
        return await axios.get(`${process.env.API_URL}/civilization`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}

/**
 * Creates a new civilization.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the civilization to create.
 * @returns {Promise<any>} - A promise that resolves to the response from the API.
 * @throws {Error} - Throws an error if an error occurs while creating the civilization.
 * @throws {ZodError} - Throws a ZodError if the name is invalid.
 */
export async function createCivilization(token: string, name: string): Promise<any> {
    try {
        CivilizationCreateSchema.parse({ name })
        return await axios.post(`${process.env.API_URL}/civilization`,
            {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        throw error
    }
}

/**
 * Fetches a civilization by name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the civilization to fetch.
 * @returns {Promise<Civilization>} - A promise that resolves to the civilization with the given name.
 * @throws {Error} - Throws an error if an error occurs while retrieving the civilization.
 */
export async function getCivilizationByName(token: string, name: string): Promise<Civilization> {
    try {
        return await axios.get(`${process.env.API_URL}/civilization/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    catch (error) {
        throw error;
    }
}

/**
 * Deletes a civilization by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the civilization to delete.
 * @returns {Promise<any>} - A promise that resolves when the civilization is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the civilization.
 */
export async function deleteCivilization(token: string, name: string): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/civilization/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error) {
        throw error
    }
}

/**
 * Updates a civilization by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the civilization to update.
 * @param {string} newName - The new name for the civilization.
 * @returns {Promise<any>} - A promise that resolves when the civilization is updated.
 * @throws {Error} - Throws an error if an error occurs while updating the civilization.
 * @throws {ZodError} - Throws a ZodError if the new name is invalid.
 */
export async function updateCivilization(token: string, name: string, newName: string): Promise<any> {
    try {
        CivilizationUpdateSchema.parse({ name: newName })
        return await axios.put(`${process.env.API_URL}/civilization/${name}`,
            {
                name: newName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
    }
    catch (error) {
        throw error
    }
}

