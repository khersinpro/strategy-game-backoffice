import axios from "axios"
import { BuildingListResponse } from "../types/building"

/**
 * Fetches a paginated list of buildings from the API.
 *
 * @param {string} token - The authorization token to be used for the request.
 * @param {number} [page=1] - The page number to fetch. Defaults to 1.
 * @param {number} [limit=20] - The number of buildings to fetch per page. Defaults to 20.
 * @returns {Promise<BuildingListResponse>} A promise that resolves to the response from the API.
 * @throws Will throw an error if the request fails.
 */
export async function getAllPaginatedBuildings(token: string, page = 1, limit = 20): Promise<BuildingListResponse> {
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