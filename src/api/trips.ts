import { supabase } from "../lib/supabase";
import type { Trip } from "../types/trip";

export async function fetchTrips(userId: string): Promise<Trip[]> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data as Trip[];
}

export async function fetchTrip(id: string): Promise<Trip | null> {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Trip | null;
}

export async function addTrip(
  trip: Pick<Trip, "user_id" | "title" | "start_date" | "end_date" | "notes">,
): Promise<Trip> {
  const { data, error } = await supabase
    .from("trips")
    .insert(trip)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Trip;
}

export async function deleteTrip(id: string): Promise<void> {
  const { error } = await supabase.from("trips").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
