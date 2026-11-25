// Shared bucket list for the Explore and Bucket List tabs.
//
// No Provider needed: React Query keeps one cache for the whole app, so every
// screen that calls useBucketList() sees the same saved items.
//
// Reading: useBucketItems (React Query).
// Writing: useMutation below. It updates the cache right away (so every screen
// changes instantly), then reloads the list to confirm with the server.
// Screens only call useBucketList() and never call Supabase.

import { addBucketItem, removeBucketItem } from "@/api/bucket-items";
import { useAuth } from "@/context/AuthContext";
import { bucketItemsKey, useBucketItems } from "@/hooks/useBucketItems";
import { useDestinations } from "@/hooks/useDestinations";
import type { BucketItemWithDestination } from "@/types/bucket-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

// "ok" = it worked
// "signed-out" = nobody is signed in, so the screen should open Sign in
// "error" = something went wrong
export type ToggleResult = "ok" | "signed-out" | "error";

type ToggleInput = {
  destinationId: string;
  existingId?: string; // set when the destination is already saved (so we remove it)
};

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

  // Write: add or remove one row
  const toggleMutation = useMutation({
    mutationFn: async (input: ToggleInput) => {
      if (input.existingId) {
        await removeBucketItem(input.existingId);
      } else {
        await addBucketItem(userId as string, input.destinationId);
      }
    },

    // 1. Change the cached list right away so every screen updates at once.
    onMutate: async (input) => {
      const key = bucketItemsKey(userId);
      await queryClient.cancelQueries({ queryKey: key });

      const previous =
        queryClient.getQueryData<BucketItemWithDestination[]>(key);

      queryClient.setQueryData<BucketItemWithDestination[]>(key, (old = []) =>
        input.existingId
          ? old.filter((item) => item.id !== input.existingId)
          : [
              ...old,
              {
                id: `temp-${input.destinationId}`,
                user_id: userId as string,
                destination_id: input.destinationId,
                created_at: null,
                destinations: null,
              },
            ],
      );

      return { previous };
    },

    // 2. If saving failed, put the old list back.
    onError: (_error, _input, context) => {
      queryClient.setQueryData(bucketItemsKey(userId), context?.previous);
    },

    // 3. Either way, reload from the server to get the real rows.
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: bucketItemsKey(userId) }),
  });

  const toggleSave = async (destinationId: string): Promise<ToggleResult> => {
    if (!userId) return "signed-out";

    // Ignore a second tap while the first one is still saving
    if (busyIds.current.has(destinationId)) return "ok";
    busyIds.current.add(destinationId);

    try {
      const existing = items.find(
        (item) => item.destination_id === destinationId,
      );

      await toggleMutation.mutateAsync({
        destinationId,
        existingId: existing?.id,
      });

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
