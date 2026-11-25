import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ScrollView, Text, View, Alert } from "react-native";
import { useColorMode } from "../context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "../design/themes";
import type { Destination } from "../types/destination";
import { Button } from "./Button";
import { useRouter } from "expo-router";
import { useBucketList } from "../hooks/useBucketList";

type Props = {
  destination: Destination;
};

export default function DestinationDetails({ destination }: Props) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];
  const router = useRouter();
  const { savedIds, toggleSave } = useBucketList();
  const isSaved = savedIds.includes(destination.id);
  const handleToggleSave = async () => {
    const result = await toggleSave(destination.id);

    if (result === "signed-out") {
      router.push("/(tabs)/profile");
    } else if (result === "error") {
      Alert.alert(
        "Couldn't update your bucket list",
        "Please try again in a moment.",
      );
    }
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      <Image
        source={{ uri: destination.image_url }}
        style={{ width: "100%", height: 320, borderRadius: 12 }}
      />

      <Text
        style={{
          color: theme.mainText,
          fontSize: fontSize.screenTitle,
          fontFamily: fontFamily.title,
          marginTop: spacing.lg,
        }}
      >
        {destination.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: spacing.sm,
          gap: 2,
          marginLeft: spacing.md,
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
            paddingHorizontal: spacing.md,
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
      <View style={{ marginTop: spacing.xl }}>
        <Text
          style={{
            color: theme.mainText,
            fontSize: fontSize.sectionTitle,
            fontFamily: fontFamily.title,
            marginBottom: spacing.md,
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
      <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: fontSize.body,
            fontFamily: fontFamily.roovia,
          }}
        >
          Region: {destination.region}
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            fontSize: fontSize.body,
            fontFamily: fontFamily.roovia,
          }}
        >
          Best Season: {destination.best_season}
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            fontSize: fontSize.body,
            fontFamily: fontFamily.roovia,
          }}
        >
          Cost Level: {destination.cost_level}
        </Text>
      </View>

      <View
        style={{
          marginTop: spacing.lg,
          gap: spacing.md,
          width: "85%",
          alignSelf: "center",
        }}
      >
        <Button
          title={isSaved ? "Remove from Bucket List" : "Save to Bucket List"}
          onPress={handleToggleSave}
        />

        <Button
          title={`Plan a Trip with ${destination.name}`}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}
