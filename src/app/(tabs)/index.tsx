import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDestinations } from "../../hooks/useDestinations";

export default function Index() {
  const router = useRouter();
  const { data, isLoading, isError } = useDestinations();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading destinations...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Unable to load destinations. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Destinations</Text>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No destinations found.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.destination}
            onPress={() =>
              router.push({
                pathname: "/destination/[id]",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>
              {item.region}, {item.country}
            </Text>
            <Text>{item.category}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  destination: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f5e9e9",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
});
