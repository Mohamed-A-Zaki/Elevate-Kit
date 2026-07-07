import { apiRoutes } from "@/shared/api/api-routes";
import { endpoint } from "@/shared/api/endpoint";
import type { User, UsersFilters } from "../types";

/**
 * Fetches a list of users from the API with optional filters.
 */
export const getUsers = async (filters?: UsersFilters): Promise<User[]> => {
  return (
    await endpoint.get(apiRoutes.users, {
      params: filters,
    })
  ).data;
};

/**
 * Fetches a single user by ID from the API.
 */
export const getUser = async (id: string): Promise<User> => {
  return (await endpoint.get(`${apiRoutes.users}/${id}`)).data;
};

/**
 * Creates a new user via the API.
 */
export const createUser = async (data: Partial<User>): Promise<User> => {
  return (await endpoint.post(apiRoutes.users, data)).data;
};

/**
 * Updates an existing user by ID via the API.
 */
export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<User> => {
  return (await endpoint.put(`${apiRoutes.users}/${id}`, data)).data;
};

/**
 * Deletes a user by ID via the API.
 */
export const deleteUser = async (id: string): Promise<void> => {
  await endpoint.delete(`${apiRoutes.users}/${id}`);
};
