import { useColorMode } from "@/context/ColorMode";
import { colors } from "@/design/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Button, Text, View } from "react-native";

export default function TabLayout() {
  const { colorMode, setColorMode } = useColorMode();
  const theme = colors[colorMode];

  return (
    <Tabs>
      {/* Explore Tab/Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/roovialogo.svg")}
                style={{ width: 30, height: 30 }}
                tintColor={theme.btnBackground}
              />
              <Text
                style={{
                  color: theme.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
              <Button
                title="Change Color Mode"
                onPress={() =>
                  setColorMode(
                    colorMode === "lightMode" ? "darkMode" : "lightMode",
                  )
                }
              />
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: theme.mainText },
          headerStyle: { backgroundColor: theme.elementBackground },
          tabBarActiveTintColor: theme.background,
          tabBarActiveBackgroundColor: theme.activeTabColor,
          tabBarInactiveBackgroundColor: theme.elementBackground,
          tabBarInactiveTintColor: theme.secondaryText,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Bucket List Tab */}
      <Tabs.Screen
        name="bucketList"
        options={{
          title: "Bucket List",
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/roovialogo.svg")}
                style={{ width: 30, height: 30 }}
                tintColor={theme.btnBackground}
              />
              <Text
                style={{
                  color: theme.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
              <Button
                title="Change Color Mode"
                onPress={() =>
                  setColorMode(
                    colorMode === "lightMode" ? "darkMode" : "lightMode",
                  )
                }
              />
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: theme.mainText },
          headerStyle: { backgroundColor: theme.elementBackground },
          tabBarActiveTintColor: theme.background,
          tabBarActiveBackgroundColor: theme.activeTabColor,
          tabBarInactiveBackgroundColor: theme.elementBackground,
          tabBarInactiveTintColor: theme.secondaryText,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Plan Tab */}
      <Tabs.Screen
        name="plan"
        options={{
          title: "Plan",
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/roovialogo.svg")}
                style={{ width: 30, height: 30 }}
                tintColor={theme.btnBackground}
              />
              <Text
                style={{
                  color: theme.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
              <Button
                title="Change Color Mode"
                onPress={() =>
                  setColorMode(
                    colorMode === "lightMode" ? "darkMode" : "lightMode",
                  )
                }
              />
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: theme.mainText },
          headerStyle: { backgroundColor: theme.elementBackground },
          tabBarActiveTintColor: theme.background,
          tabBarActiveBackgroundColor: theme.activeTabColor,
          tabBarInactiveBackgroundColor: theme.elementBackground,
          tabBarInactiveTintColor: theme.secondaryText,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/roovialogo.svg")}
                style={{ width: 30, height: 30 }}
                tintColor={theme.btnBackground}
              />
              <Text
                style={{
                  color: theme.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
              <Button
                title="Change Color Mode"
                onPress={() =>
                  setColorMode(
                    colorMode === "lightMode" ? "darkMode" : "lightMode",
                  )
                }
              />
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: theme.mainText },
          headerStyle: { backgroundColor: theme.elementBackground },
          tabBarActiveTintColor: theme.background,
          tabBarActiveBackgroundColor: theme.activeTabColor,
          tabBarInactiveBackgroundColor: theme.elementBackground,
          tabBarInactiveTintColor: theme.secondaryText,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
