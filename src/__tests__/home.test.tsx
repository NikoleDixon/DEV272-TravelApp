import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

import Index from "@/app/(tabs)/index";
import { ColorModeProvider } from "@/context/ColorMode";

jest.mock("../api/destinations", () => ({
  fetchDestinations: jest.fn().mockResolvedValue([
    {
      id: "1",
      name: "Cancun",
      country: "Mexico",
      region: "Quintana Roo",
      category: "beach",
      description: "Beautiful beaches and clear water.",
      image_url: "https://example.com/cancun.jpg",
      best_season: "Winter",
      cost_level: "moderate",
      created_at: "2026-11-20T00:00:00Z",
    },
  ]),
}));

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
