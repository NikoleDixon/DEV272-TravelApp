// this hook creates a new trip and updates the trips list.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrip } from "@/api/trips";
import { tripsKey } from "./useTrips";

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTrip,
    onSuccess: (trip) => {
      return queryClient.invalidateQueries({
        queryKey: tripsKey(trip.user_id),
      });
    },
  });
}
