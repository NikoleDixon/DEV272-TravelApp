import { supabase } from "../lib/supabase";
import type { Destination } from "../types/destination";

export async function fetchDestinations(): Promise<Destination[]> {
  const { data, error } = await supabase.from("destinations").select("*");

  if (error) {
    throw error;
  }

  return data as Destination[];
}

export async function fetchDestination(
  id: string,
): Promise<Destination | null> {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Destination | null;
}
