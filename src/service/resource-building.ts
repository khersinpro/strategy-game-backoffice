import axios from "axios";
import { CreateResourceBuilding } from "../types/resource-building";
import { CreateResourceBuildingShema } from "../schemas/resource-building";

/**
 * Creates a new resource-building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {CreateResourceBuilding} data - The data to be used to create the resource-building.
 * @returns {Promise<any>} A promise that resolves to the response from the API.
 * @throws {Error} - Throws an error if an error occurs while creating the building.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateResourceBuildingShema fails.
 */
export async function createResourceBuilding(token: string, data: CreateResourceBuilding): Promise<any> {
    try {
        CreateResourceBuildingShema.parse(data)
        return await axios.post(`${process.env.API_URL}/resource-building`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}