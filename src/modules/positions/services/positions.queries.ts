import { useQuery } from "@tanstack/react-query";
import type { PositionsFilters } from "../types";
import { getPosition, getPositions } from "./positions.api";
import { positionsKeys } from "./positions.keys";

/**
 * Hook to fetch all positions with optional filters
 */
export const useGetPositions = (filters?: PositionsFilters) => {
  return useQuery({
    queryKey: positionsKeys.list_with_filters(filters || {}),
    queryFn: () => getPositions(filters),
  });
};

/**
 * Hook to fetch a single position by ID
 */
export const useGetPosition = (id: number | null) => {
  return useQuery({
    queryKey: positionsKeys.details(id?.toString() ?? ""),
    queryFn: () => getPosition(id!.toString()),
    enabled: id != null,
  });
};
