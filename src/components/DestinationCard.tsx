import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type DestinationCardProps = {
  name: string;
  country: string;
  category: string;
  imageUrl: string;
  isSaved: boolean;
  onToggleSave: () => void;
};

export default function DestinationCard({
  name,
  country,
  category,
  imageUrl,
  isSaved,
  onToggleSave,
}: DestinationCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        accessible={true}
        accessibilityLabel={`Image of ${name}, ${country}`}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.country}>{country}</Text>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      <Pressable
        onPress={onToggleSave}
        accessibilityRole="button"
        accessibilityState={{ selected: isSaved }}
        accessibilityLabel={
          isSaved
            ? `Remove ${name} from bucket list`
            : `Add ${name} to bucket list`
        }
        style={styles.saveButton}
      >
        <FontAwesome
          name={isSaved ? "heart" : "heart-o"}
          size={24}
          color="#A3261B"
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#8A7650",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F3E46",
  },
  country: {
    fontSize: 14,
    color: "#3F4E55",
    marginTop: 4,
  },
  categoryChip: {
    backgroundColor: "#E3EDE6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#2D5A3D",
    fontWeight: "500",
  },
  saveButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
