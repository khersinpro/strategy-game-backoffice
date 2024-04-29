import axios from "axios"
import { Resource, ResourceList } from "../types/resource"
import { ResourceCreateSchema, ResourceUpdateSchema } from "../schemas/resource"
import { ZodError } from "zod"

/**
 * Fetches all resources.
 *
 * @param {string} token - The authentication token for the API.
 * @returns {Promise<ResourceList>} - A promise that resolves to a ResourceList object.
 * @throws {Error} - Throws an error if an error occurs while fetching the resources.
 */
export async function getAllResources(token: string): Promise<ResourceList> {
    try {
        return await axios.get(`${process.env.API_URL}/resource`, {
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
 * Creates a new resource after validating the name with ResourceCreateSchema.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the resource to create.
 * @returns {Promise<void>} - A promise that resolves when the resource is created.
 * @throws {Error} - Throws an error if an error occurs while creating the resource.
 * @throws {ZodError} - Throws a ZodError if the name validation with ResourceCreateSchema fails.
 */
export async function createResource(token: string, name: string): Promise<void> {
    try {
        ResourceCreateSchema.parse({ name })
        return await axios.post(`${process.env.API_URL}/resource`,
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
        throw error
    }
}

/**
 * Fetches a resource by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the resource to fetch.
 * @returns {Promise<Resource>} - A promise that resolves to a Resource object.
 * @throws {Error} - Throws an error if an error occurs while fetching the resource.
 */
export async function getResourceByName(token: string, name: string): Promise<Resource> {
    try {
        return await axios.get(`${process.env.API_URL}/resource/${name}`, {
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
 * Deletes a resource by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the resource to delete.
 * @returns {Promise<void>} - A promise that resolves when the resource is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the resource.
 */
export async function deleteResource(token: string, name: string): Promise<void> {
    try {
        return await axios.delete(`${process.env.API_URL}/resource/${name}`, {
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
 * Updates a resource after validating the name with ResourceUpdateSchema.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The current name of the resource to update.
 * @param {string} newName - The new name to update the resource to.
 * @returns {Promise<void>} - A promise that resolves when the resource is updated.
 * @throws {Error} - Throws an error if an error occurs while updating the resource.
 * @throws {ZodError} - Throws a ZodError if the name validation with ResourceUpdateSchema fails.
 */
export async function updateResource(token: string, name: string, newName: string): Promise<void> {
    try {
        ResourceUpdateSchema.parse({ name })
        return await axios.put(`${process.env.API_URL}/resource/${name}`,
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
        throw error
    }
}