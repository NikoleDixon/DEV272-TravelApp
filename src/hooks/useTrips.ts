//this hook fetches all trips associated with a specific user from Supabase
import { fetchTrips } from "@/api/trips";
import { useQuery } from "@tanstack/react-query";

export const tripsKey = (userId: string | null | undefined) =>
  ["trips", userId] as const;

export function useTrips(userId: string | null | undefined) {
  return useQuery({
    queryKey: tripsKey(userId),
    queryFn: () => fetchTrips(userId as string),
    enabled: !!userId,
  });
}
