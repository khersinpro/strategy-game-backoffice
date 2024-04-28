import axios from "axios";
import { SearchParams } from "@/src/types/search-params";
import { User, UserListResponse } from "@/src/types/user";

/**
 * Fetches a paginated list of users from the API.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} page - The page number to fetch. Defaults to 1.
 * @param {number} limit - The number of users to fetch per page. Defaults to 20.
 * @param {SearchParams} searchParams - An object containing search parameters.
 * @returns {Promise<UserListResponse>} - A promise that resolves to a list of users.
 * @throws {Error} - Throws an error if an error occurs while fetching the users.
 */
export const getAllPaginatedUsers = async (token: string, page: number = 1, limit: number = 20, searchParams: SearchParams): Promise<UserListResponse> => {
    try {
        const urlParams = new URLSearchParams(searchParams as any);
        urlParams.set('page', page.toString());
        urlParams.set('limit', limit.toString());

        return await axios.get(`${process.env.API_URL}/user?${urlParams}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error;
    }
}

/**
 * Fetches a user by ID from the API.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} id - The ID of the user to fetch.
 * @returns {Promise<User>} - A promise that resolves to the user object.
 * @throws {Error} - Throws an error if an error occurs while fetching the user.
 */
export async function getUserById(token: string, id: number): Promise<User> {
    try {
        return await axios.get(`${process.env.API_URL}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.data)
    }
    catch (error) {
        throw error;
    }
}
