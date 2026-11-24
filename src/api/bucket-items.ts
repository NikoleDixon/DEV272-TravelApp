import { supabase } from "../lib/supabase";
import type { BucketItem, BucketItemWithDestination, } from "../types/bucket-item";

export async function fetchBucketItems(userId: string,): Promise<BucketItemWithDestination[]> {
  const { data, error } = await supabase
    .from("bucket_items")
    .select("*, destinations(*)")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data as BucketItemWithDestination[];
}

export async function addBucketItem(
  userId: string,
  destinationId: string,
): Promise<BucketItem> {
  const { data, error } = await supabase
    .from("bucket_items")
    .insert({
      user_id: userId,
      destination_id: destinationId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as BucketItem;
}

export async function removeBucketItem(id: string): Promise<void> {
  const { error } = await supabase.from("bucket_items").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
