import { useColorMode } from "@/context/ColorMode";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import { colors } from "../design/themes";

// This is the home screen (route "/").
// Week 1: change the two lines marked 👇, run the app, commit, push.
export default function Index() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];
  // // 👇 Week 1: replace with your name
  // const studentName = "Your Name";
  // // 👇 Week 1: replace with something you want to build this quarter
  // const appIdea = "an app idea I have";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.body, { color: theme.mainText }]}>
        Testing the colors
      </Text>
      <Button
        title="Test color mode"
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    textAlign: "center",
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});
