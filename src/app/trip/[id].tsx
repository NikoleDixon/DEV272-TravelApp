// Plan Page: This is the page that will provide the details of a plan the user already has.

import { useColorMode } from "@/context/ColorMode";
import { colors } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlanPage() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, paddingTop: insets.top },
      ]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={26} color={theme.mainText} />
        </Pressable>
      </View>
      <Button
        title="Change Color Mode"
        onPress={() =>
          setColorMode(colorMode === "lightMode" ? "darkMode" : "lightMode")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
