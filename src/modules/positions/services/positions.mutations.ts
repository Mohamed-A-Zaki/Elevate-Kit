import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Position, UpdatePositionPayload } from "../types";
import {
  createPosition,
  deletePosition,
  updatePosition,
} from "./positions.api";
import { positionsKeys } from "./positions.keys";

interface MutationOptions {
  invalidate?: boolean;
}

/**
 * Hook to create a new position
 */
export const useCreatePosition = ({ invalidate }: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (position: Omit<Position, "id">) => createPosition(position),

    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: positionsKeys.list() });
      }
    },
  });
};

/**
 * Hook to update a position by ID
 */
export const useUpdatePosition = ({ invalidate }: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePositionPayload) =>
      updatePosition(id, data),

    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: positionsKeys.list() });
      }
    },
  });
};

/**
 * Hook to delete a position by ID
 */
export const useDeletePosition = ({ invalidate }: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deletePosition(id);
      return id;
    },

    onSuccess: () => {
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: positionsKeys.list() });
      }
    },
  });
};
