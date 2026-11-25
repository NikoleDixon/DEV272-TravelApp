// Shared bucket list for the Explore and Bucket List tabs.
//
// No Provider needed: React Query keeps one cache for the whole app, so every
// screen that calls useBucketList() sees the same saved items.
//
// Reading: useBucketItems (React Query).
// Writing: useAddBucketItem and useRemoveBucketItem.
// Both hooks handle optimistic updates, rollback, and query invalidation.
// Screens only call useBucketList() and never call Supabase.

import { useAuth } from "@/context/AuthContext";
import { useBucketItems } from "@/hooks/useBucketItems";
import { useAddBucketItem } from "@/hooks/useAddBucketItem";
import { useRemoveBucketItem } from "@/hooks/useRemoveBucketItem";
import { useDestinations } from "@/hooks/useDestinations";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

// "ok" = it worked
// "signed-out" = nobody is signed in, so the screen should open Sign in
// "error" = something went wrong
export type ToggleResult = "ok" | "signed-out" | "error";

export function useBucketList() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id ?? null;
  const queryClient = useQueryClient();

  // Read: the saved rows for this user (an empty list while signed out)
  const {
    data: items = [],
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useBucketItems(userId);

  // All destinations (the same cached data Explore uses, so no extra fetch).
  // We match these against the saved ids instead of relying on the joined
  // `destinations` column on each saved row.
  const {
    data: allDestinations = [],
    isLoading: destinationsLoading,
    isError: destinationsError,
  } = useDestinations();

  // Reload the saved list whenever this tab comes into focus, so a tab that
  // missed a change made on another tab catches up.
  useFocusEffect(
    useCallback(() => {
      if (userId) refetch();
    }, [userId, refetch]),
  );

  // Remembers which destinations are saving right now,
  // so a double tap does not run twice.
  const busyIds = useRef<Set<string>>(new Set());

  // Write: add or remove one row using mutation hooks.
  const addMutation = useAddBucketItem();
  const removeMutation = useRemoveBucketItem();

  const toggleSave = async (destinationId: string): Promise<ToggleResult> => {
    if (!userId) return "signed-out";
    if (
      queryClient.isMutating({
        mutationKey: ["bucket-items-mutation"],
      }) > 0
    ) {
      return "ok";
    }

    // Ignore a second tap while the first one is still saving
    if (busyIds.current.has(destinationId)) return "ok";
    busyIds.current.add(destinationId);

    try {
      const existing = items.find(
        (item) => item.destination_id === destinationId,
      );

      if (existing) {
        await removeMutation.mutateAsync({ id: existing.id, userId: userId });
      } else {
        await addMutation.mutateAsync({
          userId: userId,
          destinationId: destinationId,
        });
      }

      return "ok";
    } catch (error) {
      console.log("Bucket list error:", error);
      return "error";
    } finally {
      busyIds.current.delete(destinationId);
    }
  };

  const savedIds = items.map((item) => item.destination_id);

  return {
    items, // full saved rows
    savedIds, // for the hearts on Explore
    // The saved destinations themselves, for the Bucket List tab's cards
    savedDestinations: allDestinations.filter((destination) =>
      savedIds.includes(destination.id),
    ),
    isSignedIn: userId !== null,
    loading:
      authLoading || (userId !== null && (isLoading || destinationsLoading)),
    isError: isError || destinationsError,
    isRefetching,
    // Awaitable so pull-to-refresh knows when to stop spinning
    refetch: async (): Promise<void> => {
      if (userId) await refetch();
    },
    toggleSave,
  };
}
