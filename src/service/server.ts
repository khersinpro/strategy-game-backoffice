import axios from "axios"
import { ServerList } from "@/src/types/server"
import { Server } from "@/src/types/server";

/**
 * Fetches all servers.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<ServerList>} - A promise that resolves to a ServerList object.
 * @throws {Error} - Throws an error if an error occurs while fetching the servers.
 */
export async function getAllServers(token: string): Promise<ServerList> {
    try {
        return await axios.get(`${process.env.API_URL}/server`, {
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
 * Creates a new server.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the server to create.
 * @returns {Promise<any>} - A promise that resolves when the server is created.
 * @throws {Error} - Throws an error if an error occurs while creating the server.
 */
export async function createServer(token: string, name: string): Promise<any> {
    try {
        return await axios.post(`${process.env.API_URL}/server`,
            {
                name
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    catch (error) {
        throw error;
    }
}

/**
 * Fetches a specific server using its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the server to fetch.
 * @returns {Promise<Server>} - A promise that resolves to a Server object.
 * @throws {Error} - Throws an error if an error occurs while fetching the server.
 */
export async function getServerByName(token: string, name: string): Promise<Server> {
    try {
        return await axios.get(`${process.env.API_URL}/server/${name}`, {
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
 * Deletes a specific server using its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the server to delete.
 * @returns {Promise<any>} - A promise that resolves when the server is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the server.
 */
export async function deleteServer(token: string, name: string): Promise<any> {
    try {
        return await axios.delete(`${process.env.API_URL}/server/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error) {
        throw error;
    }
}

/**
 * Updates a specific server using its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The current name of the server to update.
 * @param {string} newName - The new name to update the server to.
 * @returns {Promise<any>} - A promise that resolves when the server is updated.
 * @throws {Error} - Throws an error if an error occurs while updating the server.
 */
export async function updateServer(token: string, name: string, newName: string): Promise<any> {
    try {
        return axios.put(`${process.env.API_URL}/server/${name}`,
            {
                name: newName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    }
    catch (error) {
        throw error;
    }
}