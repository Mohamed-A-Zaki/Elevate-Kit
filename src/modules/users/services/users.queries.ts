import { useQuery } from "@tanstack/react-query";
import type { UsersFilters } from "../types";
import { getUser, getUsers } from "./users.api";
import { usersKeys } from "./users.keys";

/***
 * Hook to fetch all users with optional filters
 */
export const useAllUsersQuery = (filters?: UsersFilters) => {
  return useQuery({
    queryKey: usersKeys.list_with_filters(filters || {}),
    queryFn: () => getUsers(filters),
  });
};

/**
 * Hook to fetch a single user by ID
 */
export const useSingleUserQuery = (id: number) => {
  return useQuery({
    queryKey: usersKeys.details(id.toString()),
    queryFn: () => getUser(id.toString()),
  });
};
