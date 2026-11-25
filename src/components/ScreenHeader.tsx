import { useColorMode } from "@/context/ColorMode";
import { colors, fontFamily, fontSize, spacing } from "@/design/themes";
import { StyleSheet, Text, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

// Title + subtitle used at the top of the Explore, Bucket List and Profile tabs.
export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const { colorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <View style={styles.container}>
      <Text
        accessibilityRole="header"
        style={[styles.title, { color: theme.mainText }]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.screenTitle,
    fontFamily: fontFamily.title,
  },
  subtitle: {
    fontSize: fontSize.label,
    marginTop: spacing.xs,
  },
});
