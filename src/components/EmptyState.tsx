import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "@/design/themes";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  message: string;
  // The button only shows when both of these are given.
  buttonText?: string;
  onButtonPress?: () => void;
  icon?: ReactNode;
};

export default function EmptyState({
  title,
  message,
  buttonText,
  onButtonPress,
  icon,
}: EmptyStateProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.title, { color: theme.mainText }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.secondaryText }]}>
        {message}
      </Text>
      {buttonText && onButtonPress && (
        <Pressable
          onPress={onButtonPress}
          accessibilityRole="button"
          accessibilityLabel={buttonText}
          style={[styles.button, { backgroundColor: theme.btnBackground }]}
        >
          <Text style={[styles.buttonText, { color: theme.btnText }]}>
            {buttonText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  icon: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.sectionTitle,
    fontFamily: fontFamily.title,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: fontSize.body,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  button: {
    padding: spacing.md,
    borderRadius: 8,
    minHeight: 48,
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: fontSize.body,
    fontWeight: "600",
  },
});
