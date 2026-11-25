import { AuthProvider } from "@/context/AuthContext";
import { ColorModeProvider } from "@/context/ColorMode";
import {
  CormorantGaramond_300Light,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { BucketListProvider } from "../context/SavedBucketList";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope: Manrope_400Regular,
    ManropeMedium: Manrope_500Medium,
    ManropeSemiBold: Manrope_600SemiBold,
    ManropeBold: Manrope_700Bold,
    CormorantLight: CormorantGaramond_300Light,
    CormorantRegular: CormorantGaramond_400Regular,
    CormorantMedium: CormorantGaramond_500Medium,
    CormorantSemiBold: CormorantGaramond_600SemiBold,
    CormorantBold: CormorantGaramond_700Bold,
  });

  if (!fontsLoaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ColorModeProvider>
          <BucketListProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BucketListProvider>
        </ColorModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
