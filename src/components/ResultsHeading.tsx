import { useColorMode } from "@/context/ColorMode";
import { colors, fontSize, spacing } from "@/design/themes";
import { StyleSheet, Text, View } from "react-native";

type ResultsHeadingProps = {
  title: string;
  count: number;
};

// "All destinations  ·····  Showing 4 places" row under the filters.
export default function ResultsHeading({ title, count }: ResultsHeadingProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.mainText }]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[styles.count, { color: theme.secondaryText }]}>
        Showing {count} {count === 1 ? "place" : "places"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    flexShrink: 1,
    fontSize: fontSize.sectionTitle,
    fontWeight: "bold",
  },
  count: {
    fontSize: fontSize.caption,
  },
});
