import { View, Text, Image } from "react-native";
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
        style={{ width: "100%", height: 250, borderRadius: 12 }}
      />

      <Text style={{ color: theme.mainText, fontSize: 26, fontWeight: "bold" }}>
        {destination.name}
      </Text>

      <Text style={{ color: theme.secondaryText }}>{destination.country}</Text>

      <Text style={{ color: theme.secondaryText }}>
        Region: {destination.region}
      </Text>

      <Text style={{ color: theme.secondaryText }}>
        Category: {destination.category}
      </Text>

      <Text style={{ color: theme.secondaryText }}>
        Best Season: {destination.best_season}
      </Text>

      <Text style={{ color: theme.secondaryText }}>
        Cost Level: {destination.cost_level}
      </Text>

      <Text style={{ color: theme.mainText }}>{destination.description}</Text>
      <Button title="Save to Bucket List" onPress={() => {}} />
    </View>
  );
}
