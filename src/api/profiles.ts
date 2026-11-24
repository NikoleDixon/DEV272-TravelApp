import { supabase } from "../lib/supabase";
import type { Profile } from "../types/profile";

export async function fetchProfile(id: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}

export async function saveProfile(
  profile: Pick<Profile, "id" | "display_name" | "theme">,
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Profile;
}
