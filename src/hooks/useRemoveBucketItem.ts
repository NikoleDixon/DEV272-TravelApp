import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBucketItem } from "../api/bucket-items";
import { bucketItemsKey } from "./useBucketItems";

export function useRemoveBucketItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string; userId: string }) =>
      removeBucketItem(id),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: bucketItemsKey(variables.userId),
      });
    },
  });
}
