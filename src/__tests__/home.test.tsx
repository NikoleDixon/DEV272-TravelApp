import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

import Index from "@/app/(tabs)/index";
import { ColorModeProvider } from "@/context/ColorMode";

test("Explore screen shows the destinations", async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const { findByText } = await render(
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <Index />
      </ColorModeProvider>
    </QueryClientProvider>,
  );

  expect(await findByText("Discover, Save and Explore")).toBeOnTheScreen();
  expect(await findByText("Cancun")).toBeOnTheScreen();
});
