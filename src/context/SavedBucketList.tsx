// Shared bucket list. Every screen that saves destinations uses this.
// It keeps the list in state, and uses the team's bucket-items service
// functions to talk to the bucket_items table in Supabase.

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  addBucketItem,
  fetchBucketItems,
  removeBucketItem,
} from "../api/bucket-items"; // change this path to match where bucket-items.ts is
import { supabase } from "../lib/supabase";
import type { BucketItem } from "../types/bucket-item";

// "ok" = it worked
// "signed-out" = nobody is signed in, so the screen should open Sign in
// "error" = Supabase had a problem
type ToggleResult = "ok" | "signed-out" | "error";

type BucketListContextType = {
  savedIds: string[]; // destination ids that are saved
  isSignedIn: boolean;
  loading: boolean; // true while we check the user and load the list
  toggleSave: (destinationId: string) => Promise<ToggleResult>;
};

const BucketListContext = createContext<BucketListContextType | undefined>(
  undefined,
);

export function BucketListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // We keep the full rows (not just ids) because removeBucketItem
  // needs the row id, and the screens need the destination id.
  const [items, setItems] = useState<BucketItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  // Remembers which destinations are being saved right now,
  // so a double tap does not add the same one twice.
  const busyIds = useRef<Set<string>>(new Set());

  // 1. Find out who is signed in, and keep listening for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user.id ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 2. Load the saved list whenever the signed in user changes
  useEffect(() => {
    async function loadItems() {
      if (!authChecked) return;

      // Signed out: the list is empty
      if (!userId) {
        setItems([]);
        setLoadingItems(false);
        return;
      }

      setLoadingItems(true);

      try {
        const rows = await fetchBucketItems(userId);
        setItems(rows);
      } catch (error) {
        console.log("Could not load bucket items:", error);
      }

      setLoadingItems(false);
    }

    loadItems();
  }, [userId, authChecked]);

  // 3. Save or unsave a destination
  const toggleSave = async (destinationId: string): Promise<ToggleResult> => {
    if (!userId) return "signed-out";

    // Ignore a second tap while the first one is still saving
    if (busyIds.current.has(destinationId)) return "ok";
    busyIds.current.add(destinationId);

    try {
      // Is this destination already in the list?
      const existing = items.find(
        (item) => item.destination_id === destinationId,
      );

      if (existing) {
        // Remove it from Supabase, then from the screen
        await removeBucketItem(existing.id);
        setItems((current) =>
          current.filter((item) => item.id !== existing.id),
        );
      } else {
        // Add it to Supabase, then add the new row to the screen
        const newItem = await addBucketItem(userId, destinationId);
        setItems((current) => [...current, newItem]);
      }

      return "ok";
    } catch (error) {
      console.log("Bucket list error:", error);
      return "error";
    } finally {
      // Always runs, even after an error
      busyIds.current.delete(destinationId);
    }
  };

  return (
    <BucketListContext.Provider
      value={{
        savedIds: items.map((item) => item.destination_id),
        isSignedIn: userId !== null,
        loading: !authChecked || loadingItems,
        toggleSave,
      }}
    >
      {children}
    </BucketListContext.Provider>
  );
}

export function useBucketList() {
  const context = useContext(BucketListContext);

  if (context === undefined) {
    throw new Error("useBucketList must be used inside BucketListProvider");
  }

  return context;
}
