//this hook fetches an specific trip by its ID.
import { fetchTrip } from "@/api/trips";
import { useQuery } from "@tanstack/react-query";

export function useTrip(id: string) {
  return useQuery({
    queryKey: ["trip", id],
    queryFn: () => fetchTrip(id),
    enabled: !!id,
  });
}
