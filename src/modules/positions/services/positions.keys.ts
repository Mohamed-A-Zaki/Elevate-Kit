import type { PositionsFilters } from "../types";

export const positionsKeys = {
  /**
   * Get the base key for all positions queries
   */
  all: () => {
    return ["positions"] as const;
  },
  /**
   * Get the key for the positions list query
   */
  list: () => {
    return [...positionsKeys.all(), "list"] as const;
  },
  /**
   * Get the key for the positions list query with filters
   */
  list_with_filters: (filters?: PositionsFilters) => {
    return [...positionsKeys.list(), filters] as const;
  },
  /**
   * Get the key for the single position query by ID
   */
  details: (id: string) => {
    return [...positionsKeys.all(), "details", id] as const;
  },
};
