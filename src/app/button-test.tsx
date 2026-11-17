
import { View } from "react-native";
import { Button } from "@/components/Button";
import { useColorMode } from "@/context/ColorMode";
import { colors } from "@/design/themes";

export default function ButtonTest() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Button
        title="Change Color Mode"
        onPress={() =>
          setColorMode(colorMode === "lightMode" ? "darkMode" : "lightMode")
        }
      />
    </View>
  );
}
