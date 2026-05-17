import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser, updateUser } from "./users.api";
import { usersKeys } from "./users.keys";
import type { UpdateUserPayload } from "./users.types";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
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

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserPayload) => {
      return updateUser(id, data);
    },

    onSuccess: (updatedUser) => {
      // Update single user cache
      queryClient.setQueryData(usersKeys.details(updatedUser.id), updatedUser);

      // Refresh users list
      queryClient.invalidateQueries({
        queryKey: usersKeys.list(),
      });
    },
  });
};
