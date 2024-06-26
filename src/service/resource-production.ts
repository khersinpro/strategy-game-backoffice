import axios from "axios"
import { ResourceProductionListWithLevel, UpdateResourceProduction } from "../types/resource-production"
import { updateResourceProductionSchema } from "../schemas/resource-production"

/**
 * Fetches all resource productions and their building level by building name
 *
 * @param {string} buildingName - The name of the building
 * @returns {Promise<ResourceProductionListWithLevel>}
 * @throws {Error} - Will throw an error if the data is invalid
 */
export async function getAllResourceProductionsByBuildingName(token: string, buildingName: string): Promise<ResourceProductionListWithLevel> {
    try {
        return await axios.get(`${process.env.API_URL}/resource-production/levels/${buildingName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
    }
    catch (error) {
        throw error
    }
}

/**
 * Updates a resource production
 *
 * @param {number} id - The id of the resource production
 * @param {ResourceProduction} data - The data to update the resource production
 * @returns {Promise<any>}
 * @throws {Error} - Will throw an error if the data is invalid
 * @throws {ZodError} - Will throw an error if the data is invalid
 */
export async function updateResourceProduction (token: string, id: number, data: UpdateResourceProduction): Promise<any> {
    try {
        updateResourceProductionSchema.parse(data)
        return await axios.put(`${process.env.API_URL}/resource-production/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
    }
    catch (error) {
        throw error
    }
}