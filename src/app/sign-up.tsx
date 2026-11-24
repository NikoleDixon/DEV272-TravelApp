import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormErrorSummary from "../components/FormErrorSummary";
import FormField from "../components/FormField";

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUp() {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  // State: these hold what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("");

  // Check the form before sending it to Supabase.
  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (email.trim() === "") {
      errors.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Enter an email like name@example.com.";
    }

    if (password === "") {
      errors.password = "Enter a password.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (confirmPassword === "") {
      errors.confirmPassword = "Confirm your password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSignUp = async () => {
    if (loading) return;

    const errors = validate();
    setFieldErrors(errors);
    setServerError("");
    setMessage("");
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const { error: signUpError, needsEmailConfirmation } = await signUp(
      email.trim(),
      password,
    );

    setLoading(false);

    if (signUpError) {
      setServerError(signUpError);
      return;
    }

    if (needsEmailConfirmation) {
      // Email confirmation is on: they must click the link first
      setMessage("Check your email to confirm your account, then sign in.");
    } else {
      // Email confirmation is off: the user is already signed in
      router.back();
    }
  };

  const problemCount = Object.keys(fieldErrors).length;

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + spacing.lg },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Hides the default header so we can use our own */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Circular back button */}
      <Pressable
        onPress={() => router.back()}
        style={[
          styles.backButton,
          {
            borderColor: theme.mainText,
            backgroundColor: theme.elementBackground,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="chevron-back" size={24} color={theme.mainText} />
      </Pressable>

      {/* Logo + header text (centered) */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/roovialogo.svg")}
          style={styles.logo}
          tintColor={theme.btnBackground}
        />
        <Text style={[styles.brandName, { color: theme.btnBackground }]}>
          Roovia
        </Text>
        <Text style={[styles.title, { color: theme.mainText }]}>
          Create your account
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Save destinations and plan trips with Roovia.
        </Text>
      </View>

      {/* Error summary: field problems, or a message from Supabase */}
      {problemCount > 0 ? (
        <FormErrorSummary
          title={
            problemCount === 1
              ? "There is 1 problem"
              : `There are ${problemCount} problems`
          }
          message="Check the fields marked below."
        />
      ) : serverError !== "" ? (
        <FormErrorSummary
          title="Couldn't create your account"
          message={serverError}
        />
      ) : null}

      {/* "Check your email" confirmation */}
      {message !== "" && (
        <View
          style={[
            styles.messageBox,
            {
              backgroundColor: theme.elementBackground,
              borderColor: theme.btnBackground,
            },
          ]}
          accessibilityLiveRegion="polite"
        >
          <Ionicons name="mail-outline" size={24} color={theme.btnBackground} />
          <Text style={[styles.messageText, { color: theme.mainText }]}>
            {message}
          </Text>
        </View>
      )}

      <FormField
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        error={fieldErrors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />

      <FormField
        label="Password"
        hint="At least 6 characters"
        value={password}
        onChangeText={setPassword}
        error={fieldErrors.password}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
      />

      <FormField
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={fieldErrors.confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
      />

      <View style={styles.buttonWrap}>
        <Button
          title={loading ? "Creating account..." : "Sign up"}
          onPress={handleSignUp}
        />
      </View>

      {/* Switch to sign in */}
      <Pressable
        onPress={() => router.replace("/sign-in")}
        style={styles.switchLink}
        accessibilityRole="link"
        accessibilityLabel="Sign in"
      >
        <Text style={{ color: theme.mainText, fontSize: fontSize.body }}>
          Already have an account?{" "}
          <Text
            style={{
              color: theme.highlightColor,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Sign in
          </Text>
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  brandName: {
    fontSize: fontSize.screenTitle,
    fontFamily: fontFamily.roovia,
    marginTop: spacing.sm,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontFamily: fontFamily.title,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.label,
    textAlign: "center",
    marginTop: spacing.sm,
  },
  messageBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 2,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  messageText: {
    flex: 1,
    fontSize: fontSize.label,
  },
  buttonWrap: {
    marginTop: spacing.sm,
  },
  switchLink: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
});
