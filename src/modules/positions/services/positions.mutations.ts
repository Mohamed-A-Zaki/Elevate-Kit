import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Position, UpdatePositionPayload } from "../types";
import {
  createPosition,
  deletePosition,
  updatePosition,
} from "./positions.api";
import { positionsKeys } from "./positions.keys";

/**
 * Hook to delete a position by ID
 */
export const useDeletePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deletePosition(id);
      return id;
    },

    onSuccess: () => {
      /**
       * Refresh positions list
       */
      queryClient.invalidateQueries({
        queryKey: positionsKeys.list(),
      });
    },
  });
};

/**
 * Hook to update a position by ID
 */
export const useUpdatePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdatePositionPayload) => {
      return updatePosition(id, data);
    },

    onSuccess: () => {
      /**
       * Refresh positions list
       */
      queryClient.invalidateQueries({
        queryKey: positionsKeys.list(),
      });
    },
  });
};

/**
 * Hook to create a new position
 */
export const useCreatePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (position: Omit<Position, "id">) => {
      return createPosition(position);
    },

    onSuccess: () => {
      /**
       * Refresh positions list
       */
      queryClient.invalidateQueries({
        queryKey: positionsKeys.list(),
      });
    },
  });
};
