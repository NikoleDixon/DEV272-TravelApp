// New Plan Page: This is the page a user will add a new plan for travel.
import { useColorMode } from "@/context/ColorMode";
import { colors, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ScreenHeader";

export default function NewPlanPage() {
  const { colorMode } = useColorMode();
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
      <ScrollView contentContainerStyle={styles.formContainer}>
        <ScreenHeader
          title="Create Trip"
          subtitle="Fields marked * are required."
        />
      </ScrollView>
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
  formContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
