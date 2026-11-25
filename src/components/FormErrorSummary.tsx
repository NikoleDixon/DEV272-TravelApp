import { useColorMode } from "@/context/ColorMode";
import { colors, fontSize, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

type FormErrorSummaryProps = {
  title: string;
  message: string;
};

export default function FormErrorSummary({
  title,
  message,
}: FormErrorSummaryProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: theme.elementBackground,
          borderColor: theme.errorTextColor,
        },
      ]}
    >
      <Ionicons
        name="alert-circle-outline"
        size={24}
        color={theme.errorTextColor}
      />
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: theme.errorTextColor }]}>
          {title}
        </Text>
        <Text style={[styles.message, { color: theme.mainText }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    borderWidth: 2,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: fontSize.label,
    fontWeight: "bold",
  },
  message: {
    fontSize: fontSize.label,
  },
});
