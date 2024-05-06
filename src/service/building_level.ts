import axios from "axios";
import { BuildingLevelWithCostList, CreateBuildingLevel, UpdateBuildingLevel } from "../types/building_level";
import { createBuildingLevelSchema, updateBuildingLevelSchema } from "../schemas/building_level";

/**
 * Fetches all building levels and costs per level for a given building name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} buildingName - The name of the building to retrieve levels and costs for.
 * @returns {Promise<BuildingLevelWithCostList>} - A promise that resolves to a list of all building levels and costs for the given building name.
 * @throws {Error} - Throws an error if an error occurs while retrieving the building levels and costs.
 */
export async function getBuildingLevelsAndCostByBuildingName(token: string, buildingName: string): Promise<BuildingLevelWithCostList> {
    try {
        return await axios.get(`${process.env.API_URL}/building-level/building/${buildingName}`, {
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
 * Creates a new building level.
 *
 * @param {string} token - The authentication token for the API.
 * @param {CreateBuildingLevel} data - The data to create the building level with.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while creating the building level.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function createBuildingLevel(token: string, data: CreateBuildingLevel): Promise<any> {
    try {
        createBuildingLevelSchema.parse(data);
        return await axios.post(`${process.env.API_URL}/building-level`, data, {
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
 * Updates a building level.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} buildLevelId - The ID of the building level to update.
 * @param {UpdateBuildingLevel} data - The data to update the building level with.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while updating the building level.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function updateBuildingLevel(token: string, buildLevelId: number, data: UpdateBuildingLevel): Promise<any> {
    try {
        updateBuildingLevelSchema.parse(data);
        return await axios.put(`${process.env.API_URL}/building-level/${buildLevelId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        throw error
    }
}

/**
 * Deletes a building level.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} buildLevelId - The ID of the building level to delete.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 * @throws {Error} - Throws an error if an error occurs while deleting the building level.
 */
export async function deleteBuildingLevel(token: string, buildLevelId: number): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/building-level/${buildLevelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
        throw error
    }
}
