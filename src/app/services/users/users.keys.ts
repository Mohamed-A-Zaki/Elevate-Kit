import type { UsersFilters } from "./users.types";

export const usersKeys = {
  all: ["users"] as const,

  list: () => [...usersKeys.all, "list"] as const,

  list_with_filters: (filters?: UsersFilters) =>
    [...usersKeys.list(), filters] as const,

  details: (id: number) => [...usersKeys.all, "details", id] as const,
};
