import { Text, View } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";
import { Button } from "./Button";

type ErrorMessageProps = {
  title: string;
  message: string;
  onRetry?: () => void;
};
export default function ErrorMessage({
  title,
  message,
  onRetry,
}: ErrorMessageProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: theme.errorTextColor,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: theme.secondaryText,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        {message}
      </Text>
      {onRetry && <Button title="Try Again" onPress={onRetry} />}
    </View>
  );
}
