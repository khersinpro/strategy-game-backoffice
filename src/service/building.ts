import axios from "axios"
import { Building, BuildingListResponse, UpdateBuilding } from "../types/building"
import { updateBuildingSchema } from "../schemas/building"

/**
 * Fetches a paginated list of buildings from the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {number} [page=1] - The page number to fetch. Defaults to 1.
 * @param {number} [limit=20] - The number of buildings to fetch per page. Defaults to 20.
 * @returns {Promise<BuildingListResponse>} A promise that resolves to the response from the API.
 * @throws Will throw an error if the request fails.
 */
export async function getAllPaginatedBuildings(token: string, page: number = 1, limit: number = 20): Promise<BuildingListResponse> {
    try {
        return await axios.get(`${process.env.API_URL}/building?page=${page}&limit=${limit}`, {
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
 * Fetches a single building by its name from the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {string} name - The name of the building to fetch.
 * @returns {Promise<Building>} A promise that resolves to the response from the API.
 * @throws Will throw an error if the request fails.
 */
export async function getBuildingByName(token: string, name: string): Promise<Building> {
    try {
        return await axios.get(`${process.env.API_URL}/building/${name}`, {
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
 * Updates a building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {string} name - The name of the building to update.
 * @param {UpdateBuilding} data - The data to update the building with.
 * @returns {Promise<any>} - A promise that resolves to the response from the API.
 * @throws {Error} Will throw an error if the request fails.
 * @throws {ZodError} - Throws a ZodError if the data is invalid.
 */
export async function updateBuilding(token: string, name: string, data: UpdateBuilding): Promise<any> {
    try {
        updateBuildingSchema.parse(data)
        return await axios.put(`${process.env.API_URL}/building/${name}`, data, {
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
 * Deletes a building in the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {string} name - The name of the building to delete.
 * @returns {Promise<any>} A promise that resolves to the response from the API.
 * @throws Will throw an error if the request fails.
 */
export async function deleteBuilding(token: string, name: string): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/building/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error
    }
}