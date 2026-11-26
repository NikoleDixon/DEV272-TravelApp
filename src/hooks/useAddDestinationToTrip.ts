//this hook will add a destination to a trip that the user is planning.
import { addTripDestination } from "@/api/trip-destinations";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddDestinationToTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tripId,
      destinationId,
    }: {
      tripId: string;
      destinationId: string;
    }) => addTripDestination(tripId, destinationId),
    onSuccess: (tripDestination) => {
      return queryClient.invalidateQueries({
        queryKey: ["trip-destinations", tripDestination.trip_id],
      });
    },
  });
}
