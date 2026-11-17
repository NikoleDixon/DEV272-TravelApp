import { Pressable, Text, View } from "react-native";

type ErrorMessageProps = {
  title: string;
  message: string;
  onRetry: () => void;
};

export default function ErrorMessage({
  title,
  message,
  onRetry,
}: ErrorMessageProps) {
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
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        {message}
      </Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Try again"
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
          minHeight: 48,
          minWidth: 120,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
        }}
      >
        <Text>Try Again</Text>
      </Pressable>
    </View>
  );
}
