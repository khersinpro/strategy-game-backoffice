import axios from "axios"
import { MilitaryBuildingList } from "../types/military-building"

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