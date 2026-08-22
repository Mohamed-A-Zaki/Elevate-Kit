import { apiRoutes } from "@/shared/api/api-routes";
import { endpoint } from "@/shared/api/endpoint";
import type {
  GetPositionsResponse,
  Position,
  PositionsFilters,
} from "../types";

/**
 * Fetches a list of positions from the API with optional filters.
 */
export const getPositions = async (filters?: PositionsFilters) => {
  const { data } = await endpoint.get<GetPositionsResponse>(
    apiRoutes.positions,
    { params: filters },
  );
  return data;
};

/**
 * Fetches a single position by ID from the API.
 */
export const getPosition = async (id: number) => {
  const { data } = await endpoint.get<Position>(`${apiRoutes.positions}/${id}`);
  return data;
};

/**
 * Creates a new position via the API.
 */
export const createPosition = async (values: Partial<Position>) => {
  const { data } = await endpoint.post<Position>(apiRoutes.positions, values);
  return data;
};

/**
 * Updates an existing position by ID via the API.
 */
export const updatePosition = async (id: number, values: Partial<Position>) => {
  const { data } = await endpoint.put<Position>(
    `${apiRoutes.positions}/${id}`,
    values,
  );
  return data;
};

/**
 * Deletes a position by ID via the API.
 */
export const deletePosition = async (id: number) => {
  await endpoint.delete(`${apiRoutes.positions}/${id}`);
};
