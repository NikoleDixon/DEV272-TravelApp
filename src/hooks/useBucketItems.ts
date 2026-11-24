import { useQuery } from "@tanstack/react-query";
import { fetchBucketItems } from "@/api/bucket-items";

export const bucketItemsKey = (userId: string | null | undefined) =>
  ["bucket-items", userId] as const;

export function useBucketItems(userId: string) {
  return useQuery({
    queryKey: bucketItemsKey(userId),
    queryFn: () => fetchBucketItems(userId),
    enabled: !!userId,
  });
}
