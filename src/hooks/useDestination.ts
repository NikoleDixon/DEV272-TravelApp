import { useQuery } from "@tanstack/react-query";
import { fetchDestination } from "../api/destinations";

export function useDestination(id: string) {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: () => fetchDestination(id),
  });
}
