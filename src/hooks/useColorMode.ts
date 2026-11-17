// Purpose: Hook for toggling between light and dark.

import { colors } from "@/constants/themes";
import { useColorScheme } from "react-native";

export function useColorMode() {
  const c = colors[useColorScheme() === "dark" ? "darkMode" : "lightMode"];
  return c;
}
