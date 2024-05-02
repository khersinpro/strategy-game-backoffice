import axios from "axios"
import { CreateMilitaryBuilding, MilitaryBuildingList } from "../types/military-building"
import { CreateMilitaryBuildingShema } from "../schemas/military-building"

/**
 * Fetches all military buildings.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<MilitaryBuildingList>} - A promise that resolves to a list of all military buildings.
 * @throws {Error} - Throws an error if an error occurs while retrieving the military buildings.
 */
export async function getAllMilitaryBuildings(token: string): Promise<MilitaryBuildingList> {
    try {
        return await axios.get(`${process.env.API_URL}/military-building`, {
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
 * Creates a new military building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {CreateMilitaryBuilding} data - The data to be used to create the military building.
 * @returns {Promise<any>} A promise that resolves to the response from the API.
 * @throws {Error} - Throws an error if an error occurs while creating the building.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateMilitaryBuildingShema fails.
 */
export async function createMilitaryBuilding(token: string, data: CreateMilitaryBuilding): Promise<any> {
    try {
        CreateMilitaryBuildingShema.parse(data)
        return await axios.post(`${process.env.API_URL}/military-building`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}