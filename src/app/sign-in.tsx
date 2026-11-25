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
};

export default function SignIn() {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState(""); // e.g. "Invalid login credentials"

  // Check the form before sending it to Supabase.
  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (email.trim() === "") {
      errors.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Enter an email like name@example.com.";
    }

    if (password === "") {
      errors.password = "Enter your password.";
    }

    return errors;
  };

  const handleSignIn = async () => {
    if (loading) return; // stops double taps

    const errors = validate();
    setFieldErrors(errors);
    setServerError("");
    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const errorMessage = await signIn(email.trim(), password);

    setLoading(false);

    if (errorMessage) {
      setServerError(errorMessage);
      return;
    }

    router.back(); // go back to Profile
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
        <Text style={[styles.title, { color: theme.mainText }]}>Sign in</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Sign in to save destinations and plan trips.
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
        <FormErrorSummary title="Couldn't sign in" message={serverError} />
      ) : null}

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
        autoComplete="current-password"
        textContentType="password"
      />

      <View style={styles.buttonWrap}>
        <Button
          title={loading ? "Signing in..." : "Sign in"}
          onPress={handleSignIn}
        />
      </View>

      {/* Switch to sign up */}
      <Pressable
        onPress={() => router.replace("/sign-up")}
        style={styles.switchLink}
        accessibilityRole="link"
        accessibilityLabel="Sign up"
      >
        <Text style={{ color: theme.mainText, fontSize: fontSize.body }}>
          Don&#39;t have an account?{" "}
          <Text
            style={{
              color: theme.highlightColor,
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Sign up
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
