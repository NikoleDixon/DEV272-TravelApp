import { Destination } from "./destination";

export type BucketItem = {
  id: string;
  user_id: string;
  destination_id: string;
  created_at: string | null;
};

export type BucketItemWithDestination = BucketItem & {
  destinations: Destination | null;
};
