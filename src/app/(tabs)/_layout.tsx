import ColorModeProvider from "@/components/ColorModeProvider";
import { useColorMode } from "@/hooks/useColorMode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  const c = useColorMode();

  return (
    <Tabs screenOptions={{ headerRight: () => <ColorModeProvider /> }}>
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
                tintColor={c.btnBackground}
              />
              <Text
                style={{
                  color: c.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: c.mainText },
          headerStyle: { backgroundColor: c.elementBackground },
          tabBarActiveTintColor: c.background,
          tabBarActiveBackgroundColor: c.activeTabColor,
          tabBarInactiveBackgroundColor: c.elementBackground,
          tabBarInactiveTintColor: c.secondaryText,
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
                tintColor={c.btnBackground}
              />
              <Text
                style={{
                  color: c.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: c.mainText },
          headerStyle: { backgroundColor: c.elementBackground },
          tabBarActiveTintColor: c.background,
          tabBarActiveBackgroundColor: c.activeTabColor,
          tabBarInactiveBackgroundColor: c.elementBackground,
          tabBarInactiveTintColor: c.secondaryText,
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
                tintColor={c.btnBackground}
              />
              <Text
                style={{
                  color: c.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: c.mainText },
          headerStyle: { backgroundColor: c.elementBackground },
          tabBarActiveTintColor: c.background,
          tabBarActiveBackgroundColor: c.activeTabColor,
          tabBarInactiveBackgroundColor: c.elementBackground,
          tabBarInactiveTintColor: c.secondaryText,
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
                tintColor={c.btnBackground}
              />
              <Text
                style={{
                  color: c.mainText,
                  fontSize: 14,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Roovia
              </Text>
            </View>
          ),
          headerTitleAlign: "left",
          headerTitleStyle: { color: c.mainText },
          headerStyle: { backgroundColor: c.elementBackground },
          tabBarActiveTintColor: c.background,
          tabBarActiveBackgroundColor: c.activeTabColor,
          tabBarInactiveBackgroundColor: c.elementBackground,
          tabBarInactiveTintColor: c.secondaryText,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
