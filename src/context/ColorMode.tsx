import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type ColorMode = "lightMode" | "darkMode";
type ColorModeContextType = {
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("lightMode");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function loadColorMode() {
      const savedMode = await AsyncStorage.getItem("colorMode");

      if (savedMode === "lightMode" || savedMode === "darkMode") {
        setColorMode(savedMode);
      }

      setHydrated(true);
    }

    loadColorMode();
  }, []);

  useEffect(() => {
    if (hydrated) {
      AsyncStorage.setItem("colorMode", colorMode);
    }
  }, [colorMode, hydrated]);

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used inside ColorModeProvider");
  }

  return context;
}
