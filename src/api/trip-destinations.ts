import { supabase } from "../lib/supabase";
import type { TripDestination } from "../types/trip-destination";

export async function fetchTripDestinations(
  tripId: string,
): Promise<TripDestination[]> {
  const { data, error } = await supabase
    .from("trip_destinations")
    .select("*")
    .eq("trip_id", tripId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data as TripDestination[];
}

export async function addTripDestination(
  tripId: string,
  destinationId: string,
): Promise<TripDestination> {
  const { data, error } = await supabase
    .from("trip_destinations")
    .insert({
      trip_id: tripId,
      destination_id: destinationId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as TripDestination;
}

export async function removeTripDestination(id: string): Promise<void> {
  const { error } = await supabase
    .from("trip_destinations")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
