// Purpose: Toggle button to change between light and dark colors.

import { colors } from "@/constants/themes";
import type { StyleProp, ViewStyle } from "react-native";
import {
  Appearance,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";

export default function Toggle({
  style,
}: { style?: StyleProp<ViewStyle> } = {}) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const c = colors[isDark ? "darkMode" : "lightMode"];

  return (
    <Pressable
      onPress={() => Appearance.setColorScheme?.(isDark ? "light" : "dark")}
      onLongPress={() => Appearance.setColorScheme?.("unspecified")}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityLabel="Dark mode"
      accessibilityState={{ checked: isDark }}
      style={[
        styles.toggle,
        {
          backgroundColor: c.background,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: c.mainText }]}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
