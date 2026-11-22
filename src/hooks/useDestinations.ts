import { useQuery } from "@tanstack/react-query";
import { fetchDestinations } from "../api/destinations";

export function useDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });
}
