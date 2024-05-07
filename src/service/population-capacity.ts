import axios from "axios";
import { PopulationCapacityListWithLevel, UpdatePopulationCapacity } from "../types/population_capacity";

/**
 * Fetches all population capacities and their building level by building name
 *
 * @param {string} buildingName - The name of the building
 * @returns {Promise<PopulationCapacityListWithLevel>}
 */
export async function getAllPopulationCapacitiesByBuildingName(token: string, buildingName: string): Promise<PopulationCapacityListWithLevel> {
    try {
        return await axios.get(`${process.env.API_URL}/population-capacity/levels/${buildingName}`, {
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
 * Updates a population capacity
 *
 * @param {number} id - The id of the population capacity
 * @param {UpdatePopulationCapacity} data - The data to update the population capacity
 * @returns {Promise<any>}
 */
export async function updatePopulationCapacity (token: string, id: number, data: UpdatePopulationCapacity): Promise<any> {
    try {
        return await axios.put(`${process.env.API_URL}/population-capacity/${id}`, data, {
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