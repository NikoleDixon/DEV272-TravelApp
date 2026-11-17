import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";

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
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.elementBackground,
          borderColor: theme.cardBorderColor,
        },
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        accessible={true}
        accessibilityLabel={`Image of ${name}, ${country}`}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.mainText }]}>{name}</Text>
        <Text style={[styles.country, { color: theme.secondaryText }]}>
          {country}
        </Text>
        <View
          style={[
            styles.categoryChip,
            { backgroundColor: theme.placeholderBackground },
          ]}
        >
          <Text style={[styles.categoryText, { color: theme.mainText }]}>
            {category}
          </Text>
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
          color={theme.errorTextColor}
        />
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
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
  },
  country: {
    fontSize: 14,
    marginTop: 4,
  },
  categoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  saveButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
