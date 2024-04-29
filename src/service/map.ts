import axios from "axios"
import { MapList, CreateMapData, UpdateMapData, Map } from "../types/map"
import { CreateMapSchema, UpdateMapSchema } from "../schemas/map"

/**
 * Fetches all maps.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<MapList>} - A promise that resolves to a MapList object.
 * @throws {Error} - Throws an error if an error occurs while fetching the maps.
 */
export async function getAllMaps(token: string): Promise<MapList> {
    try {
        return await axios.get(`${process.env.API_URL}/map`, {
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
 * Fetches a map by its ID.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The ID of the map to fetch.
 * @returns {Promise<Map>} - A promise that resolves to a Map object.
 * @throws {Error} - Throws an error if an error occurs while fetching the map.
 */
export async function getMapById(token: string, id: number): Promise<Map> {
    try {
        return await axios.get(`${process.env.API_URL}/map/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data);
    }
    catch (error) {
        throw error;
    }
}

/**
 * Creates a new map after validating the data with CreateMapSchema.
 *
 * @param {string} token - The authentication token for the API.
 * @param {CreateMapData} data - The data for the map to create.
 * @returns {Promise<void>} - A promise that resolves when the map is created.
 * @throws {Error} - Throws an error if an error occurs while creating the map.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateMapSchema fails.
 */
export async function createMap(token: string, data: CreateMapData): Promise<void> {
    try {
        CreateMapSchema.parse(data)
        return await axios.post(`${process.env.API_URL}/map`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    catch (error) {
        throw error
    }
}

/**
 * Deletes a map by its ID.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The ID of the map to delete.
 * @returns {Promise<any>} - A promise that resolves when the map is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the map.
 */
export async function deleteMap(token: string, id: number): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/map/${id}`, {
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
 * Updates a map by its ID after validating the data with UpdateMapSchema.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The ID of the map to update.
 * @param {UpdateMapData} data - The new data for the map.
 * @returns {Promise<void>} - A promise that resolves when the map is updated.
 * @throws {Error} - Throws an error if an error occurs while updating the map.
 * @throws {ZodError} - Throws a ZodError if the data validation with UpdateMapSchema fails.
 */
export async function updateMap(token: string, id: number, data: UpdateMapData): Promise<void> {
    try {
        UpdateMapSchema.parse(data)
        return await axios.put(`${process.env.API_URL}/map/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
    }
    catch (error) {
        throw error
    }
}