import axios from "axios";
import { CreateWallBuilding } from "../types/wall-building";
import { CreateWallBuildingShema } from "../schemas/wall-building";

/**
 * Creates a new wall-building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {CreateWallBuilding} data - The data to be used to create the wall-building.
 * @returns {Promise<any>} A promise that resolves to the response from the API.
 * @throws {Error} - Throws an error if an error occurs while creating the building.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateWallBuildingShema fails.
 */
export async function createWallBuilding(token: string, data: CreateWallBuilding): Promise<any> {
    try {
        CreateWallBuildingShema.parse(data)
        return await axios.post(`${process.env.API_URL}/wall-building`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}