import { apiRoutes } from "@/shared/api/api-routes";
import { endpoint } from "@/shared/api/endpoint";
import { type Position, type PositionsFilters } from "./../types/index";

/**
 * Fetches a list of positions from the API with optional filters.
 */
export const getPositions = async (
  filters?: PositionsFilters,
): Promise<{
  results: Position[];
  totalPages: number;
}> => {
  return (
    await endpoint.get(apiRoutes.positions, {
      params: filters,
    })
  ).data;
};

/**
 * Fetches a single position by ID from the API.
 */
export const getPosition = async (id: string): Promise<Position> => {
  return (await endpoint.get(`${apiRoutes.positions}/${id}`)).data;
};

/**
 * Creates a new position via the API.
 */
export const createPosition = async (
  data: Partial<Position>,
): Promise<Position> => {
  return (await endpoint.post(apiRoutes.positions, data)).data;
};

/**
 * Updates an existing position by ID via the API.
 */
export const updatePosition = async (
  id: number,
  data: Partial<Position>,
): Promise<Position> => {
  return (await endpoint.put(`${apiRoutes.positions}/${id}`, data)).data;
};

/**
 * Deletes a position by ID via the API.
 */
export const deletePosition = async (id: number): Promise<void> => {
  await endpoint.delete(`${apiRoutes.positions}/${id}`);
};
