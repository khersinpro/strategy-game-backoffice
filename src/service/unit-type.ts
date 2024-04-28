import axios from "axios"
import { UnitType, UnitTypeList } from "@/src/types/unit-type"

/**
 * Fetches a list of all unit types from the API.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<UnitTypeList>} - A promise that resolves to a list of unit types.
 * @throws {Error} - Throws an error if an error occurs while fetching the unit types.
 */
export async function getAllUnitTypes(token: string): Promise<UnitTypeList> {
    try {
        return await axios.get(`${process.env.API_URL}/unit-type`, {
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
 * Creates a new unit type in the API.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} type - The type of the unit to create.
 * @returns {Promise<any>} - A promise that resolves when the unit type is created.
 * @throws {Error} - Throws an error if an error occurs while creating the unit type.
 */
export async function createUnitType(token: string, type: string): Promise<any> {
    try {
        return await axios.post(`${process.env.API_URL}/unit-type`,
            {
                type
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    catch (error: any) {
        throw new Error(error.message ? error.message : 'Une erreur est survenue')
    }
}

/**
 * Fetches a specific unit type using its type.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} type - The type of the unit to fetch.
 * @returns {Promise<UnitType>} - A promise that resolves to a UnitType object.
 * @throws {Error} - Throws an error if an error occurs while fetching the unit type.
 */
export async function getUnitTypeByType(token: string, type: string): Promise<UnitType> {
    try {
        return await axios.get(`${process.env.API_URL}/unit-type/${type}`, {
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
 * Deletes a specific unit type using its type.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} type - The type of the unit to delete.
 * @returns {Promise<any>} - A promise that resolves when the unit type is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the unit type.
 */
export async function deleteUnitType(token: string, type: string): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/unit-type/${type}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error) {
        throw error;
    }
}

/**
 * Updates a specific unit type using its type.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} type - The type of the unit to update.
 * @param {string} newType - The new type to update the unit to.
 * @returns {Promise<any>} - A promise that resolves when the unit type is updated.
 * @throws {Error} - Throws an error if an error occurs while updating the unit type.
 */
export async function updateUnitType(token: string, type: string, newType: string): Promise<any> {
    try {
        return await axios.put(`${process.env.API_URL}/unit-type/${type}`,
            {
                type: newType
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    }
    catch (error: any) {
        throw error;
    }
}