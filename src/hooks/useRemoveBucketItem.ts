import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBucketItem } from "../api/bucket-items";
import { bucketItemsKey } from "./useBucketItems";
import type { BucketItemWithDestination } from "../types/bucket-item";

export function useRemoveBucketItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["bucket-items-mutation"],
    networkMode: "always",
    mutationFn: ({ id }: { id: string; userId: string }) =>
      removeBucketItem(id),

    onMutate: async (variables) => {
      const queryKey = bucketItemsKey(variables.userId);

      await queryClient.cancelQueries({ queryKey });

      const previousItems =
        queryClient.getQueryData<BucketItemWithDestination[]>(queryKey);

      queryClient.setQueryData<BucketItemWithDestination[]>(
        queryKey,
        (previousItems ?? []).filter((item) => item.id !== variables.id),
      );
      return { previousItems };
    },

    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        bucketItemsKey(variables.userId),
        context?.previousItems ?? [],
      );
    },

    onSettled: (_data, _error, variables) => {
      return queryClient.invalidateQueries({
        queryKey: bucketItemsKey(variables.userId),
      });
    },
  });
}
