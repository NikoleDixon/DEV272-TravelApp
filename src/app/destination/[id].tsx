import { useColorMode } from "@/context/ColorMode";
import { colors } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDestination } from "@/hooks/useDestination";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import DestinationDetails from "@/components/DestinationDetails";

export default function DestinationPage() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: destination, isPending, isError } = useDestination(id);
  if (isPending) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <LoadingSkeleton />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ErrorMessage
          title="Unexpected Detour!"
          message="This wasn't on the itinerary. Let's get back on track!"
        />
      </View>
    );
  }
  if (!destination) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <EmptyState
          title="Destination Not Found"
          message="Looks like this destination isn't on our map yet!"
          buttonText="Go Back"
          onButtonPress={() => router.back()}
        />
      </View>
    );
  }

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
      <DestinationDetails destination={destination} />
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
