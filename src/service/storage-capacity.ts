import axios from "axios"
import { StorageCapacityListWithLevel } from "../types/storage_capacity"
import { UpdateStorageBuilding } from "../types/storage-building"
import { updateStorageCapacitySchema } from "../schemas/storage-capacity"

/**
 * Fetches all storage capacities and their building level by building name
 *
 * @param {string} buildingName - The name of the building
 * @returns {Promise<StorageCapacityListWithLevel>}
 */
export async function getAllStorageCapacityByBuildingName(token: string, buildingName: string): Promise<StorageCapacityListWithLevel> {
    try {
        return await axios.get(`${process.env.API_URL}/storage-capacity/levels/${buildingName}`, {
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
 * Updates a storage capacity
 *
 * @param {number} id - The id of the storage capacity
 * @param {StorageCapacity} data - The data to update the storage capacity
 * @returns {Promise<any>}
 * @throws {Error} - Will throw an error if the data is invalid
 * @throws {ZodError} - Will throw an error if the data is invalid
 */
export async function updateStorageCapacity (token: string, id: number, data: UpdateStorageBuilding): Promise<any> {
    try {
        updateStorageCapacitySchema.parse(data)
        return await axios.put(`${process.env.API_URL}/storage-capacity/${id}`, data, {
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