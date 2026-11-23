// Profile Tab: for login in and eventually light/dark mode

import { useColorMode } from "@/context/ColorMode";
import { colors, fontSize, spacing } from "@/design/themes";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { Button } from "../../components/Button";

export default function Profile() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];
  const isDark = colorMode === "darkMode";

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.screenTitle, { color: theme.mainText }]}>
        Profile
      </Text>
      <Text style={[styles.text, { color: theme.secondaryText }]}>
        You are browsing as a guest.
      </Text>
      {/* Signed out card */}
      <View
        style={[
          styles.card,
          {
            borderColor: theme.inputBorder,
            backgroundColor: theme.elementBackground,
          },
        ]}
      >
        {/* Logo */}
        <Image
          source={require("@/assets/images/roovialogo.svg")}
          style={[styles.logo]}
          tintColor={theme.btnBackground}
        />
        <Text style={[styles.logoText, { color: theme.mainText }]}>Roovia</Text>

        <Text style={[styles.cardTitle, { color: theme.mainText }]}>
          You are not signed in.
        </Text>
        <Text style={[styles.profileMessage, { color: theme.secondaryText }]}>
          Sign in or create an account to save destinations and plan trips.
        </Text>

        {/* Each button opens a screen on top of this one */}
        <View
          style={[styles.buttonWrap, { backgroundColor: theme.btnBackground }]}
        >
          <Button title="Sign in" onPress={() => router.push("/sign-in")} />
        </View>
        <View
          style={[styles.buttonWrap, { backgroundColor: theme.btnBackground }]}
        >
          <Button title="Sign up" onPress={() => router.push("/sign-up")} />
        </View>
      </View>

      {/* Appearance section */}
      <Text style={[styles.sectionTitle, { color: theme.mainText }]}>
        Appearance
      </Text>
      <View
        style={[
          styles.row,
          {
            borderColor: theme.inputBorder,
            backgroundColor: theme.elementBackground,
          },
        ]}
      >
        <Text style={[styles.rowLabel, { color: theme.mainText }]}>
          Dark mode
        </Text>
        <Switch
          value={isDark}
          onValueChange={(isOn) =>
            setColorMode(isOn ? "darkMode" : "lightMode")
          }
          trackColor={{ false: theme.inputBorder, true: theme.btnBackground }}
          ios_backgroundColor={theme.btnBackground}
          thumbColor={theme.btnText}
          accessibilityLabel="Dark mode"
          style={[styles.toggle]}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: fontSize.screenTitle,
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  card: {
    borderWidth: 1,
    borderRadius: spacing.md,
    padding: spacing.xl,
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoText: {
    fontSize: fontSize.screenTitle,
    fontWeight: "bold",
    fontFamily: "Manrope",
  },
  text: { fontSize: fontSize.body, marginBottom: spacing.md },
  profileMessage: {
    fontSize: fontSize.body,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: fontSize.label,
    fontWeight: "bold",
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  buttonWrap: {
    width: "100%",
    marginTop: spacing.sm,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: fontSize.sectionTitle,
    fontWeight: "bold",
    marginBottom: spacing.md,
  },
  toggle: {
    marginTop: 9,
  },
  row: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLabel: { fontSize: fontSize.body },
});
