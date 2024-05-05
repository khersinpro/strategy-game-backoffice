import axios from "axios";
import { updateBuildingCostSchema } from "../schemas/building_cost";
import { UpdateBuildingCost } from "../types/building_cost";

/**
 * Updates a building cost.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The ID of the building cost to update.
 * @param {UpdateBuildingCost} data - The data to update the building cost with.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while updating the building cost.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function updateBuildingCost(token: string, id: number, data: UpdateBuildingCost): Promise<any> {
    try {
        updateBuildingCostSchema.parse(data)
        return await axios.put(`${process.env.API_URL}/building-cost/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data)
    } catch (error) {
        throw error
    }
}