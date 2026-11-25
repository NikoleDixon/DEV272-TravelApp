import type { Category } from "@/constants/categories";
import { useColorMode } from "@/context/ColorMode";
import { colors, fontSize, spacing } from "@/design/themes";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CategoryFilterProps = {
  // Only needs the label and value; the screens use `types` for filtering.
  categories: Pick<Category, "label" | "value">[];
  selected: string; // the selected category's value
  onSelect: (value: string) => void;
};

// Row of filter chips shared by the Explore and Bucket List tabs.
export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const isSelected = selected === category.value;

        return (
          <Pressable
            key={category.value}
            onPress={() => onSelect(category.value)}
            accessibilityRole="button"
            accessibilityLabel={`${category.label} filter`}
            accessibilityState={{ selected: isSelected }}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? theme.activeTabColor
                  : theme.elementBackground,
                borderColor: isSelected
                  ? theme.activeTabColor
                  : theme.inputBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: isSelected ? theme.btnText : theme.mainText },
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    minHeight: 48,
    minWidth: 48,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: fontSize.body,
    fontWeight: "600",
    textAlign: "center",
  },
});
