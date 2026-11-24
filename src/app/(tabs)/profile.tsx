// Profile Tab: sign in / sign up, account info, and dark mode

import { Button } from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import ScreenHeader from "../../components/ScreenHeader";

export default function ProfileScreen() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];
  const { user, isSignedIn, loading, signOut } = useAuth();

  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const isDark = colorMode === "darkMode";

  const handleSignOut = async () => {
    if (signingOut) return;
    setSignOutError("");
    setSigningOut(true);

    const errorMessage = await signOut();

    setSigningOut(false);

    if (errorMessage) {
      setSignOutError(errorMessage);
    }
    // On success, AuthContext sees the change and this screen switches
    // back to the signed-out view on its own.
  };

  // Wait for the saved session to load so we don't flash the guest view.
  if (loading) {
    return (
      <View style={[styles.flex, { backgroundColor: theme.background }]} />
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      {/* Screen header */}
      <ScreenHeader
        title="Profile"
        subtitle={isSignedIn ? "Roovia" : "You are browsing as a guest"}
      />

      {isSignedIn ? (
        /* ---------- Signed in: account card ---------- */
        <>
          <Text style={[styles.sectionTitle, { color: theme.mainText }]}>
            Account
          </Text>
          <View
            style={[
              styles.card,
              styles.accountCard,
              {
                backgroundColor: theme.elementBackground,
                borderColor: theme.inputBorder,
              },
            ]}
          >
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: theme.placeholderBackground,
                  borderColor: theme.mainText,
                },
              ]}
            >
              <Ionicons
                name="person-outline"
                size={28}
                color={theme.mainText}
              />
            </View>
            <View style={styles.accountText}>
              <Text style={[styles.caption, { color: theme.secondaryText }]}>
                Signed in as
              </Text>
              <Text
                style={[styles.email, { color: theme.mainText }]}
                numberOfLines={1}
              >
                {user?.email}
              </Text>
            </View>
          </View>
        </>
      ) : (
        /* ---------- Signed out: guest card ---------- */
        <View
          style={[
            styles.card,
            styles.guestCard,
            {
              backgroundColor: theme.elementBackground,
              borderColor: theme.inputBorder,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/roovialogo.svg")}
            style={styles.logo}
            tintColor={theme.btnBackground}
          />
          <Text style={[styles.brandName, { color: theme.btnBackground }]}>
            Roovia
          </Text>
          <Text style={[styles.guestTitle, { color: theme.mainText }]}>
            You&#39;re not signed in
          </Text>
          <Text style={[styles.guestMessage, { color: theme.secondaryText }]}>
            Sign in or create an account to save destinations and plan trips.
          </Text>

          <View style={styles.buttonStack}>
            <Button title="Sign in" onPress={() => router.push("/sign-in")} />
            <OutlineButton
              title="Sign up"
              color={theme.btnBackground}
              onPress={() => router.push("/sign-up")}
            />
          </View>
        </View>
      )}

      {/* ---------- Appearance (both states) ---------- */}
      <Text style={[styles.sectionTitle, { color: theme.mainText }]}>
        Appearance
      </Text>
      <View
        style={[
          styles.card,
          styles.settingRow,
          {
            backgroundColor: theme.elementBackground,
            borderColor: theme.inputBorder,
          },
        ]}
      >
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.mainText }]}>
            Dark mode
          </Text>
          <Text style={[styles.caption, { color: theme.secondaryText }]}>
            {isDark ? "On" : "Off"} · saved on this device
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={(on) => setColorMode(on ? "darkMode" : "lightMode")}
          trackColor={{ false: theme.btnBackground, true: theme.btnBackground }}
          ios_backgroundColor={theme.btnBackground}
          thumbColor={theme.elementBackground}
          accessibilityLabel="Dark mode"
        />
      </View>

      {/* ---------- Sign out (signed in only) ---------- */}
      {isSignedIn && (
        <View style={styles.signOutWrap}>
          <OutlineButton
            title={signingOut ? "Signing out..." : "Sign out"}
            color={theme.btnBackground}
            icon="log-out-outline"
            onPress={handleSignOut}
          />
          {signOutError !== "" && (
            <Text
              style={[styles.errorText, { color: theme.errorTextColor }]}
              accessibilityRole="alert"
            >
              {signOutError}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

// Secondary (outlined) button used for "Sign up" and "Sign out".
// Kept local so Button.tsx doesn't need to change.
type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
};

function OutlineButton({ title, onPress, color, icon }: OutlineButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.outlineButton, { borderColor: color }]}
    >
      {icon && <Ionicons name={icon} size={22} color={color} />}
      <Text style={[styles.outlineButtonText, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: fontSize.sectionTitle,
    fontFamily: fontFamily.title,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  caption: {
    fontSize: fontSize.caption,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: spacing.xl,
  },

  // Guest card
  guestCard: {
    padding: spacing.xl,
    alignItems: "center",
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
    fontWeight: "bold",
    marginTop: spacing.sm,
  },
  guestTitle: {
    fontSize: fontSize.sectionTitle,
    fontFamily: fontFamily.title,
    textAlign: "center",
    marginTop: spacing.lg,
  },
  guestMessage: {
    fontSize: fontSize.label,
    lineHeight: 24,
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  buttonStack: {
    alignSelf: "stretch",
    gap: spacing.md,
  },

  // Account card
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    flex: 1,
  },
  email: {
    fontSize: fontSize.body,
    fontWeight: "bold",
    marginTop: spacing.xs,
  },

  // Dark mode row
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    minHeight: 64,
  },
  settingText: {
    flex: 1,
    paddingRight: spacing.md,
  },
  settingTitle: {
    fontSize: fontSize.body,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },

  // Sign out
  signOutWrap: {
    marginTop: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.caption,
    marginTop: spacing.sm,
    textAlign: "center",
  },

  // Outline button
  outlineButton: {
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 48,
    minWidth: 48,
    padding: spacing.md,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    fontSize: fontSize.body,
    fontWeight: "600",
  },
});
