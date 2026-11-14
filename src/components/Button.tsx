import { Pressable, StyleSheet, Text } from "react-native";
//import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: ButtonProps) {
  //const { colorMode } = useColorMode();
  //const theme = colors[colorMode];
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    minHeight: 48,
    minWidth: 48,
    backgroundColor: colors.lightMode.btnBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    color: colors.lightMode.btnText,
  },
});
