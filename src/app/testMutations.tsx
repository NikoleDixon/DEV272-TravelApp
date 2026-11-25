import { Button, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useBucketItems } from "../hooks/useBucketItems";
import { useAddBucketItem } from "../hooks/useAddBucketItem";
import { useRemoveBucketItem } from "../hooks/useRemoveBucketItem";
import { useDestinations } from "../hooks/useDestinations";

export default function TestMutations() {
  const { user } = useAuth();

  const { data: items } = useBucketItems(user?.id ?? "");
  const { data: destinations } = useDestinations();

  const addMutation = useAddBucketItem();
  const removeMutation = useRemoveBucketItem();

  const destination = destinations?.[0];

  const savedItem = items?.find(
    (item) => item.destination_id === destination?.id,
  );

  const isPending =
    addMutation.isPending || removeMutation.isPending;
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Testing Card 22 - Mutations</Text>

      <Text>User: {user ? "Signed in" : "Not signed in"}</Text>

      <Text>Destination: {destination?.name}</Text>

      <Text>Saved: {savedItem ? "Yes" : "No"}</Text>

      <Text>Saved destinations: {items?.length ?? 0}</Text>

      <Button
        title="Add to Bucket List"
        disabled={!user || !destination || !!savedItem || isPending}
        onPress={() => {
          if (user && destination) {
            addMutation.mutate({
              userId: user.id,
              destinationId: destination.id,
            });
          }
        }}
      />

      <Button
        title="Remove from Bucket List"
        disabled={!user || !savedItem || isPending}
        onPress={() => {
          if (user && savedItem) {
            removeMutation.mutate({
              id: savedItem.id,
              userId: user.id,
            });
          }
        }}
      />

      <Text>Adding: {String(addMutation.isPending)}</Text>

      <Text>Removing: {String(removeMutation.isPending)}</Text>

      <Text>
        Error:{" "}
        {addMutation.error?.message ?? removeMutation.error?.message ?? "None"}
      </Text>
    </View>
  );
}
