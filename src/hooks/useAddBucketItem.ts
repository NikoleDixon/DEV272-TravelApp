import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBucketItem } from "../api/bucket-items";
import { bucketItemsKey } from "./useBucketItems";
import type { BucketItemWithDestination } from "../types/bucket-item";

export function useAddBucketItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["bucket-items-mutation"],
    networkMode: "always",
    mutationFn: ({
      userId,
      destinationId,
    }: {
      userId: string;
      destinationId: string;
    }) => addBucketItem(userId, destinationId),

    onMutate: async (variables) => {
      const queryKey = bucketItemsKey(variables.userId);

      await queryClient.cancelQueries({ queryKey });

      const previousItems =
        queryClient.getQueryData<BucketItemWithDestination[]>(queryKey);

      const newItem: BucketItemWithDestination = {
        id: `temp-${variables.destinationId}`,
        user_id: variables.userId,
        destination_id: variables.destinationId,
        created_at: new Date().toISOString(),
        destinations: null,
      };
      queryClient.setQueryData<BucketItemWithDestination[]>(queryKey, [
        ...(previousItems ?? []),
        newItem,
      ]);

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
