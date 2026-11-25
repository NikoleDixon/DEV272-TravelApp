import { useColorMode } from "@/context/ColorMode";
import { colors, fontSize, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type FormFieldProps = TextInputProps & {
  label: string;
  hint?: string; // small helper text under the label, e.g. "At least 6 characters"
  error?: string; // when set, the field turns red and shows the message below
};

export default function FormField({
  label,
  hint,
  error,
  ...inputProps
}: FormFieldProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  const hasError = !!error;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.mainText }]}>{label}</Text>
      {hint && (
        <Text style={[styles.hint, { color: theme.secondaryText }]}>
          {hint}
        </Text>
      )}

      <TextInput
        {...inputProps}
        accessibilityLabel={label}
        placeholderTextColor={theme.secondaryText}
        style={[
          styles.input,
          {
            backgroundColor: theme.elementBackground,
            color: theme.mainText,
            borderColor: hasError ? theme.errorTextColor : theme.inputBorder,
            borderWidth: hasError ? 2 : 1,
          },
        ]}
      />

      {hasError && (
        <View style={styles.errorRow} accessibilityLiveRegion="polite">
          <Ionicons
            name="alert-circle-outline"
            size={18}
            color={theme.errorTextColor}
          />
          <Text style={[styles.errorText, { color: theme.errorTextColor }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.label,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: fontSize.caption,
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    fontSize: fontSize.label,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  errorText: {
    flex: 1,
    fontSize: fontSize.caption,
  },
});
