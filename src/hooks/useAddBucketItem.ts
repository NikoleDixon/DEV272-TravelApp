import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBucketItem } from "../api/bucket-items";
import { bucketItemsKey } from "./useBucketItems";

export function useAddBucketItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      destinationId,
    }: {
      userId: string;
      destinationId: string;
    }) => addBucketItem(userId, destinationId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bucketItemsKey(variables.userId),
      });
    },
  });
}
