import { fetchBucketItems } from "@/api/bucket-items";
import { useQuery } from "@tanstack/react-query";

export const bucketItemsKey = (userId: string | null | undefined) =>
  ["bucket-items", userId] as const;

// userId is null while signed out, so the query stays switched off.
export function useBucketItems(userId: string | null | undefined) {
  return useQuery({
    queryKey: bucketItemsKey(userId),
    queryFn: () => fetchBucketItems(userId as string),
    enabled: !!userId,
  });
}
