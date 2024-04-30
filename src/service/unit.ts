import axios from "axios"
import { createUnitData, Unit, UnitListResponse, UpdateUnitData } from "../types/unit"
import { CreateUnitShema, UpdateUnitShema } from "../schemas/unit"

/**
 * Retrieves a paginated list of units.
 *
 * @param {string} token - The authentication token for the API.
 * @param {number} page - The page number to retrieve. Defaults to 1.
 * @param {number} limit - The number of units per page. Defaults to 20.
 * @returns {Promise<UnitListResponse>} - A promise that resolves to a paginated list of units.
 * @throws {Error} - Throws an error if an error occurs while retrieving the units.
 */
export async function getAllPaginatedUnits(token: string, page: number = 1, limit: number = 20): Promise<UnitListResponse> {
  try {
    return await axios.get(`${process.env.API_URL}/unit?page=${page}&limit=${limit}`, {
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
 * Creates a new unit after validating the data with CreateUnitSchema.
 *
 * @param {string} token - The authentication token for the API.
 * @param {createUnitData} data - The data for the unit to create.
 * @returns {Promise<any>} - A promise that resolves when the unit is created.
 * @throws {Error} - Throws an error if an error occurs while creating the unit.
 * @throws {ZodError} - Throws a ZodError if the data validation with CreateUnitSchema fails.
 */
export async function createUnit(token: string, data: createUnitData): Promise<any> {
  try {
    CreateUnitShema.parse(data)
    return await axios.post(`${process.env.API_URL}/unit`,
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
 * Fetches a unit by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the unit to retrieve.
 * @returns {Promise<Unit>} - A promise that resolves to the unit.
 * @throws {Error} - Throws an error if an error occurs while retrieving the unit.
 */
export async function getUnitByName(token: string, name: string): Promise<Unit> {
  try {
    return await axios.get(`${process.env.API_URL}/unit/${name}`, {
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
 * Deletes a unit by its name.
 *
 * @param {string} token - The authentication token for the API.
 * @param {string} name - The name of the unit to delete.
 * @returns {Promise<any>} - A promise that resolves when the unit is deleted.
 * @throws {Error} - Throws an error if an error occurs while deleting the unit.
 */
export async function deleteUnit(token: string, name: string): Promise<any> {
  try {
    return await axios.delete(`${process.env.API_URL}/unit/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.data)
  }
  catch (error) {
    throw error
  }
}

export async function updateUnit (token: string, name: string, data: UpdateUnitData): Promise<any> {
  try {
    UpdateUnitShema.parse(data)
    return await axios.put(`${process.env.API_URL}/unit/${name}`,
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