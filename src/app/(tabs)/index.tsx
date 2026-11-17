// Explore Tab: This is the starting/home page. It contains all the places that you can explore.

import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

// Sample data: each destination has an id and a name
const DESTINATIONS = [
  { id: "1", name: "Maui, Hawaii" },
  { id: "2", name: "Kyoto, Japan" },
  { id: "3", name: "Paris, France" },
  { id: "4", name: "Cape Town, South Africa" },
];

export default function ExploreTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DESTINATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/destination/${item.id}`} style={styles.link}>
            <Text style={styles.name}>{item.name}</Text>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  link: {
    paddingVertical: 14, // makes the tap area at least 48 tall
    minHeight: 48,
  },
  name: { fontSize: 18 },
});
