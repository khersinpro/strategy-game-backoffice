import axios from "axios";
import { CreateStorageBuildingShema } from "../schemas/storage-building";
import { CreateStorageBuilding } from "../types/storage-building";

/**
 * Creates a new storage-building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {CreateStorageBuilding} data - The data to be used to create the storage-building.
 * @returns {Promise<any>} A promise that resolves to the response from the API.
 * @throws {Error} - Throws an error if an error occurs while creating the building.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateStorageBuildingShema fails.
 */
export async function createStorageBuilding(token: string, data: CreateStorageBuilding): Promise<any> {
    try {
        CreateStorageBuildingShema.parse(data)
        return await axios.post(`${process.env.API_URL}/storage-building`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}