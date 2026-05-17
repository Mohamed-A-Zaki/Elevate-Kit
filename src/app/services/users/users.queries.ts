import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "./users.api";
import { usersKeys } from "./users.keys";
import type { UsersFilters } from "./users.types";

export const useAllUsersQuery = (filters?: UsersFilters) => {
  return useQuery({
    queryKey: usersKeys.list_with_filters(filters),
    queryFn: () => getUsers(filters),
  });
};

export const useSingleUserQuery = (id: number) => {
  return useQuery({
    queryKey: usersKeys.details(id),
    queryFn: () => getUser(id),
  });
};
