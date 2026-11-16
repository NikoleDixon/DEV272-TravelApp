import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
      <Image source={{ uri: imageUrl }} style={{ width: 80, height: 80 }} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text>{name}</Text>
        <Text>{country}</Text>
        <Text>{category}</Text>
      </View>

      <Pressable
        onPress={onToggleSave}
        accessibilityRole="button"
        accessibilityLabel={
          isSaved
            ? `Remove ${name} from bucket list`
            : `Add ${name} to bucket list`
        }
        style={{
          minWidth: 48,
          minHeight: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
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
  },
});
