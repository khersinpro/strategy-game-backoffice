import axios from "axios"
import { UpdateWallDefense, WallDefenseListWithLevel } from "../types/wall-defense"

/**
 * Fetches all wall defenses and their building level by building name
 *
 * @param {string} buildingName - The name of the building
 * @returns {Promise<WallDefenseListWithLevel>}
 */
export async function getAllWallDefenseByBuildingName(token: string, buildingName: string): Promise<WallDefenseListWithLevel> {
    try {
        return await axios.get(`${process.env.API_URL}/wall-defense/levels/${buildingName}`, {
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
 * Updates a wall defense
 *
 * @param {number} id - The id of the wall defense
 * @param {UpdateWallDefense} data - The data to update the wall defense
 * @returns {Promise<any>}
 */
export async function updateWallDefense (token: string, id: number, data: UpdateWallDefense): Promise<any> {
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