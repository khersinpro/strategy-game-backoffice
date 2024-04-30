import axios from "axios"
import { DefenseTypeList, UpdateDefenseTypeData } from "../types/defense-type"
import { UpdateDefenseTypeShema } from "../schemas/defense-type"

/**
 * Fetches all defense types for a given unit name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} unitName - The name of the unit to retrieve defense types for.
 * @returns {Promise<DefenseTypeList>} - A promise that resolves to a list of all defense types for the given unit name.
 * @throws {Error} - Throws an error if an error occurs while retrieving the defense types.
 */
export async function getAllDefenseTypeByUnitName(token: string, unitName: string): Promise<DefenseTypeList> {
    try {
        return await axios.get(`${process.env.API_URL}/defense-type/${unitName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
    }
    catch (error) {
        throw error
    }
}

/**
 * Updates and validate a defense type for a given unit name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {UpdateDefenseTypeData} data - The data to update the defense type with.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while updating the defense type.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function updateDefenseType(token: string, data: UpdateDefenseTypeData): Promise<any> {
    try {
        UpdateDefenseTypeShema.parse(data)
        return await axios.put(`${process.env.API_URL}/defense-type/${data.unit_name}/${data.type}`,
            {
                defense_value: data.defense_value

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => response.data)
    }
    catch (error) {
        throw error
    }
}