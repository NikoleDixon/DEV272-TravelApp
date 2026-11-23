import { AuthProvider } from "@/context/AuthContext";
import { ColorModeProvider } from "@/context/ColorMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ColorModeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ColorModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
