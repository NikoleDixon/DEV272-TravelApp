// New Plan Page: This is the page a user will add a new plan for travel.
import { Button } from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FormErrorSummary from "@/components/FormErrorSummary";
import FormField from "@/components/FormField";
import ScreenHeader from "@/components/ScreenHeader";
import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FieldErrors = {
  title?: string;
  startDate?: string;
  endDate?: string;
  destinations?: string;
  notes?: string;
};

export default function NewPlanPage() {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (title.trim() === "") {
      errors.title = "Enter a trip title.";
    }
    if (startDate === "") {
      errors.startDate = "Enter a start date.";
    }
    if (endDate === "") {
      errors.endDate = "Enter a end date.";
    } else if (startDate !== "" && endDate <= startDate) {
      errors.endDate = "End date must be after the start date.";
    }
    if (selectedDestinations.length === 0) {
      errors.destinations = "Add at least one destination.";
    }
    if (notes.length > 500) {
      errors.notes = "You can't enter more than 500 characters. ";
    }
    return errors;
  };
  const handleCreateTrip = () => {
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;
  };
  const problemCount = Object.keys(fieldErrors).length;
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
        <ScreenHeader title="Create Trip" subtitle="Required fields *" />
        {problemCount > 0 && (
          <FormErrorSummary
            title={
              problemCount === 1
                ? "There is 1 problem"
                : `There are ${problemCount} problems`
            }
            message="Check the fields marked below."
          />
        )}
        <FormField
          label="Trip name: *"
          placeholder="Example: Summer Trip"
          value={title}
          onChangeText={setTitle}
          error={fieldErrors.title}
        />
        <FormField
          label="Start date *"
          placeholder="YYYY-MM-DD"
          value={startDate}
          onChangeText={setStartDate}
          error={fieldErrors.startDate}
        />
        <DatePicker value={startDate} onChange={setStartDate} />
        <FormField
          label="End date *"
          placeholder="YYYY-MM-DD"
          value={endDate}
          onChangeText={setEndDate}
          error={fieldErrors.endDate}
        />
        <DatePicker value={endDate} onChange={setEndDate} />
        <View style={{ marginBottom: spacing.lg }}>
          <Text
            style={{
              color: theme.mainText,
              fontSize: fontSize.label,
              fontWeight: "600",
              fontFamily: fontFamily.roovia,
              marginBottom: spacing.xs,
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
                borderColor: fieldErrors.destinations?.length
                  ? theme.errorTextColor
                  : theme.inputBorder,
                borderWidth: fieldErrors.destinations ? 2 : 1,
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
          {fieldErrors.destinations && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
                marginTop: spacing.sm,
              }}
              accessibilityLiveRegion="polite"
            >
              <Ionicons
                name="alert-circle-outline"
                size={18}
                color={theme.errorTextColor}
              />
              <Text
                style={{
                  flex: 1,
                  color: theme.errorTextColor,
                  fontSize: fontSize.caption,
                }}
              >
                {fieldErrors.destinations}
              </Text>
            </View>
          )}
        </View>
        <FormField
          label="Notes: "
          placeholder=""
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
          maxLength={500}
          error={fieldErrors.notes}
        />
        <Text
          style={{
            color: theme.secondaryText,
            fontFamily: fontFamily.roovia,
            fontSize: fontSize.caption,
            textAlign: "right",
          }}
        >
          {notes.length}/500
        </Text>
        <View style={{ marginTop: spacing.lg }}>
          <Button title="Create trip" onPress={handleCreateTrip} />
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
