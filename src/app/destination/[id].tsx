import DestinationDetails from "@/components/DestinationDetails";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useColorMode } from "@/context/ColorMode";
import { colors } from "@/design/themes";
import { useDestination } from "@/hooks/useDestination";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DestinationPage() {
  const { colorMode } = useColorMode();
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
        { backgroundColor: theme.background, paddingTop: insets.top + 12 },
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
        <Text
          style={{
            color: theme.mainText,
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Destination Details
        </Text>

        <View style={{ width: 34 }} />
      </View>
      <DestinationDetails destination={destination} />
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
