import { View } from "react-native";

export default function LoadingSkeleton() {
  return (
    <View
      accessible={true}
      accessibilityLabel="Loading destination"
      accessibilityRole="progressbar"
      style={{
        flexDirection: "row",
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        gap: 12,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 12,
          backgroundColor: "#D3D3D3",
        }}
      />

      <View style={{ flex: 1, justifyContent: "center", gap: 8 }}>
        <View
          style={{
            width: "85%",
            height: 16,
            borderRadius: 8,
            backgroundColor: "#D3D3D3",
          }}
        />

        <View
          style={{
            width: "60%",
            height: 14,
            borderRadius: 8,
            backgroundColor: "#D3D3D3",
          }}
        />

        <View
          style={{
            width: "40%",
            height: 14,
            borderRadius: 8,
            backgroundColor: "#D3D3D3",
          }}
        />
      </View>
    </View>
  );
}
