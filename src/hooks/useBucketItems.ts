import { useQuery } from "@tanstack/react-query";
import { fetchBucketItems } from "@/api/bucket-items";

export function useBucketItems(userId: string) {
  return useQuery({
    queryKey: ["bucket-items", userId],
    queryFn: () => fetchBucketItems(userId),
    enabled: !!userId,
  });
}
