import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UpdateUserPayload, User } from "../types";
import { createUser, deleteUser, updateUser } from "./users.api";
import { usersKeys } from "./users.keys";

/**
 * Hook to delete a user by ID
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
      return id;
    },

    onSuccess: (deletedUserId) => {
      /**
       * Remove deleted user from single user cache
       */
      queryClient.removeQueries({
        queryKey: usersKeys.details(deletedUserId),
      });

      /**
       * Refresh users list
       */
      queryClient.invalidateQueries({
        queryKey: usersKeys.list(),
      });
    },
  });
};

/**
 * Hook to update a user by ID
 */
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserPayload) => {
      return updateUser(id, data);
    },

    onSuccess: (updatedUser) => {
      /**
       * Update single user cache
       */
      queryClient.setQueryData(usersKeys.details(updatedUser.id), updatedUser);

      /**
       * Refresh users list
       */
      queryClient.invalidateQueries({
        queryKey: usersKeys.list(),
      });
    },
  });
};

/**
 * Hook to create a new user
 */
export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Omit<User, "id">) => {
      return createUser(user);
    },

    onSuccess: () => {
      /**
       * Refresh users list
       */
      queryClient.invalidateQueries({
        queryKey: usersKeys.list(),
      });
    },
  });
};
