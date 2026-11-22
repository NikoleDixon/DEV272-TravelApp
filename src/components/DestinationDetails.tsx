import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors } from "../design/themes";
import type { Destination } from "../types/destination";
import { Button } from "./Button";

type Props = {
  destination: Destination;
};

export default function DestinationDetails({ destination }: Props) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View style={{ padding: 16 }}>
      <Image
        source={{ uri: destination.image_url }}
        style={{ width: "100%", height: 320, borderRadius: 12 }}
      />

      <Text
        style={{
          color: theme.mainText,
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 16,
        }}
      >
        {destination.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
          gap: 2,
          marginLeft: 12,
        }}
      >
        <Ionicons
          name="location-outline"
          size={22}
          color={theme.secondaryText}
        />

        <Text style={{ color: theme.secondaryText, fontSize: 17 }}>
          {destination.country}
        </Text>

        <View
          style={{
            backgroundColor: theme.elementBackground,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: theme.secondaryText }}>
            {destination.category}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <Text
          style={{
            color: theme.mainText,
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          About
        </Text>

        <Text
          style={{
            color: theme.mainText,
            fontSize: 18,
            lineHeight: 28,
          }}
        >
          {destination.description}
        </Text>
      </View>
      <View style={{ marginTop: 16, gap: 8 }}>
        <Text style={{ color: theme.secondaryText, fontSize: 16 }}>
          Region: {destination.region}
        </Text>

        <Text style={{ color: theme.secondaryText, fontSize: 16 }}>
          Best Season: {destination.best_season}
        </Text>

        <Text style={{ color: theme.secondaryText, fontSize: 16 }}>
          Cost Level: {destination.cost_level}
        </Text>
      </View>

      <View
        style={{ marginTop: 16, gap: 12, width: "85%", alignSelf: "center" }}
      >
        <Button title="Save to Bucket List" onPress={() => {}} />

        <Button
          title={`Plan a Trip with ${destination.name}`}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
