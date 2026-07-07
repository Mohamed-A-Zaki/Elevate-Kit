import type { UsersFilters } from "../types";

export const usersKeys = {
  /**
   * Get the base key for all users queries
   */
  all: () => {
    return ["users"] as const;
  },
  /**
   * Get the key for the users list query
   */
  list: () => {
    return [...usersKeys.all(), "list"] as const;
  },
  /**
   * Get the key for the users list query with filters
   */
  list_with_filters: (filters?: UsersFilters) => {
    return [...usersKeys.list(), filters] as const;
  },
  /**
   * Get the key for the single user query by ID
   */
  details: (id: string) => {
    return [...usersKeys.all(), "details", id] as const;
  },
};
