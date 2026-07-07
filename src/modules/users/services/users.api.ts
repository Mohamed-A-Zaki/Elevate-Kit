import { apiRoutes } from "@/shared/api/api-routes";
import { endpoint } from "@/shared/api/endpoint";
import type { User, UsersFilters } from "../types";

export const getUsers = async (filters?: UsersFilters): Promise<User[]> => {
  return (
    await endpoint.get(apiRoutes.users, {
      params: filters,
    })
  ).data;
};

export const getUser = async (id: string): Promise<User> => {
  return (await endpoint.get(`${apiRoutes.users}/${id}`)).data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  return (await endpoint.post(apiRoutes.users, data)).data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<User> => {
  return (await endpoint.put(`${apiRoutes.users}/${id}`, data)).data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await endpoint.delete(`${apiRoutes.users}/${id}`);
};
