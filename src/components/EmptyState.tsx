import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

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
        }}
      >
        {message}
      </Text>
      <Pressable
        onPress={onButtonPress}
        accessibilityRole="button"
        accessibilityLabel={buttonText}
      >
        <Text>{buttonText}</Text>
      </Pressable>
    </View>
  );
}
