// New Plan Page: This is the page a user will add a new plan for travel.
import { useColorMode } from "@/context/ColorMode";
import { colors, spacing, fontFamily, fontSize } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { Pressable, StyleSheet, View, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ScreenHeader";
import FormField from "@/components/FormField";
import { Button } from "@/components/Button";

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
        <ScreenHeader title="Create Trip" subtitle="Field requiered *." />
        <FormField
          label="Your trip name: *"
          placeholder="Example: Summer Trip"
        />
        <FormField label="Start date *" placeholder="YYYY-MM-DD" />
        <FormField label="End date *" placeholder="YYYY-MM-DD" />
        <View style={{ marginBottom: spacing.lg }}>
          <Text
            style={{
              color: theme.mainText,
              fontSize: fontSize.label,
              fontWeight: "600",
              fontFamily: fontFamily.roovia,
            }}
          >
            Destinations *
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              fontSize: fontSize.caption,
              marginTop: spacing.xs,
              fontFamily: fontFamily.roovia,
            }}
          >
            Add the places you are planning to visit.
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              fontFamily: fontFamily.roovia,
              fontSize: fontSize.caption,
              marginTop: spacing.md,
            }}
          >
            No destinations added yet.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
              marginTop: spacing.md,
            }}
          >
            <Pressable
              style={{
                backgroundColor: theme.elementBackground,
                borderColor: theme.inputBorder,
                borderWidth: 1,
                borderRadius: 12,
                padding: spacing.md,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: theme.secondaryText,
                  fontFamily: fontFamily.roovia,
                  fontSize: fontSize.label,
                }}
              >
                Choose a destination
              </Text>

              <Ionicons name="chevron-down" size={20} color={theme.mainText} />
            </Pressable>

            <Button title="+Add" onPress={() => {}} />
          </View>
        </View>
        <FormField
          label="Notes: "
          placeholder="Ideas, reminders, things to book..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text
          style={{
            color: theme.secondaryText,
            fontFamily: fontFamily.roovia,
            fontSize: fontSize.caption,
            textAlign: "right",
          }}
        >
          0/500
        </Text>
        <View style={{ marginTop: spacing.lg }}>
          <Button title="Create trip" onPress={() => {}} />
        </View>
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
