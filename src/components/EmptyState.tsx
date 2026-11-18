import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";

type EmptyStateProps = {
  title: string;
  message: string;
  buttonText: string;
  onButtonPress: () => void;
  icon?: ReactNode;
};

export default function EmptyState({
  title,
  message,
  buttonText,
  onButtonPress,
  icon,
}: EmptyStateProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {icon && <View style={{ marginBottom: 20 }}>{icon}</View>}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 8,
          color: theme.mainText,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
          lineHeight: 24,
          color: theme.secondaryText,
        }}
      >
        {message}
      </Text>
      <Pressable
        onPress={onButtonPress}
        accessibilityRole="button"
        accessibilityLabel={buttonText}
        style={{
          backgroundColor: theme.btnBackground,
          padding: 12,
          borderRadius: 8,
          minHeight: 48,
          minWidth: 48,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{buttonText}</Text>
      </Pressable>
    </View>
  );
}
