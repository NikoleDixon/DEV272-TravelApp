import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize } from "@/design/themes";
import { supabase } from "@/lib/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignIn() {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (loading) return; // stops double taps
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message); // for example: "Invalid login credentials"
      return;
    }

    router.back(); // go back to Profile
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
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
            borderColor: theme.inputBorder,
            backgroundColor: theme.elementBackground,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color={theme.mainText}
        />
      </Pressable>

      {/* Logo */}
      <View style={styles.brand}>
        <Image
          source={require("@/assets/images/roovialogo.svg")}
          style={[styles.logo]}
          tintColor={theme.btnBackground}
        />
        <Text style={[styles.brandName, { color: theme.mainText }]}>
          Roovia
        </Text>
      </View>

      {/* Header text */}
      <Text style={[styles.title, { color: theme.mainText }]}>Sign in</Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Sign in to save destinations and plan trips.
      </Text>

      {/* Email */}
      <Text style={[styles.label, { color: theme.mainText }]}>Email</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.inputBorder,
            color: theme.mainText,
            backgroundColor: theme.elementBackground,
          },
        ]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={[styles.label, { color: theme.mainText }]}>
        Password (At least 6 characters)
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.inputBorder,
            color: theme.mainText,
            backgroundColor: theme.elementBackground,
          },
        ]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {error !== "" && (
        <Text
          style={[styles.errorText, { color: theme.errorTextColor }]}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}

      {/* Sign in button */}
      <View style={styles.buttonWrap}>
        <Button title="Sign in" onPress={handleSignIn} />
      </View>

      {/* Switch to sign up */}
      <Pressable
        onPress={() => router.replace("/sign-up")}
        style={styles.switchLink}
      >
        <Text style={{ color: theme.mainText }}>
          Don&#39;t have an account?{" "}
          <Text
            style={{
              color: theme.btnBackground,
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
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  brandName: {
    fontSize: fontSize.screenTitle,
    fontFamily: fontFamily.roovia,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontWeight: "bold",
    fontFamily: fontFamily.title,
  },
  subtitle: { fontSize: fontSize.label, marginTop: 8, marginBottom: 24 },
  label: { fontSize: fontSize.label, marginBottom: 6 },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: fontSize.label,
    marginBottom: 16,
  },
  errorText: {
    fontSize: fontSize.caption,
    marginBottom: 8,
  },
  buttonWrap: { marginTop: 8 },
  switchLink: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});
