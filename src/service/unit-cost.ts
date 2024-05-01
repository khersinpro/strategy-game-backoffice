import axios from "axios";
import { UnitCostList, UpdateUnitCostData } from "../types/unit-cost";
import { UpdateUnitCostShema } from "../schemas/unit-cost";

/**
 * Fetches all unit costs for a given unit name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} unitName - The name of the unit to retrieve unit costs for.
 * @returns {Promise<UnitCostList>} - A promise that resolves to a list of all unit costs for the given unit name.
 * @throws {Error} - Throws an error if an error occurs while retrieving the unit costs.
 */
export async function getAllUnitCostsByUnitName(token: string, unitName: string): Promise<UnitCostList> {
    try {
        return await axios.get(`${process.env.API_URL}/unit-cost/unit/${unitName}`, {
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
 * Updates and validate a unit cost for a given unit name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The id of the unit cost to update.
 * @param {UpdateUnitCostData} data - The data to update the unit cost with.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while updating the unit cost.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function updateUnitCost(token: string, id: number, data: UpdateUnitCostData): Promise<any> {
    try {
        UpdateUnitCostShema.parse(data)
        return await axios.put(`${process.env.API_URL}/unit-cost/${id}`,
            {
                quantity: data.quantity
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