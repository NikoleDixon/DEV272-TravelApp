import { Pressable, StyleSheet, Text } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: ButtonProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.button, { backgroundColor: theme.btnBackground }]}
    >
      <Text style={[styles.buttonText, { color: theme.btnText }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    minHeight: 48,
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
  },
});

