import axios from "axios"
import { UnitProductionListWithLevel, UpdateUnitProduction } from "../types/unit-production"
import { updateUnitProductionSchema } from "../schemas/unit-production"

/**
 * Fetches all unit productions and their building level by building name
 *
 * @param {string} buildingName - The name of the building
 * @returns {Promise<UnitProductionListWithLevel>}
 * @throws {Error} - Will throw an error if the data is invalid
 */
export async function getAllUnitProductionByBuildingName(token: string, buildingName: string): Promise<UnitProductionListWithLevel> {
    try {
        return await axios.get(`${process.env.API_URL}/unit-production/levels/${buildingName}`, {
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
 * Updates a unit production
 *
 * @param {number} id - The id of the unit production
 * @param {UpdateUnitProduction} data - The data to update the unit production
 * @returns {Promise<any>}
 * @throws {Error} - Will throw an error if the data is invalid
 * @throws {ZodError} - Will throw an error if the data is invalid
 */
export async function updateUnitProduction(token: string, id: number, data: UpdateUnitProduction): Promise<any> {
    try {
        updateUnitProductionSchema.parse(data)
        return await axios.put(`${process.env.API_URL}/unit-production/${id}`, data, {
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