import type { UsersFilters } from "./users.types";

export const usersKeys = {
  all: () => {
    return ["users"] as const;
  },

  list: () => {
    return [...usersKeys.all(), "list"] as const;
  },

  list_with_filters: (filters?: UsersFilters) => {
    return [...usersKeys.list(), filters] as const;
  },

  details: (id: number) => {
    return [...usersKeys.all(), "details", id] as const;
  },
};
