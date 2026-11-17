import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

import Index from "@/app/(tabs)/index";

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
      <Index />
    </QueryClientProvider>,
  );

  expect(await findByText("Explore Destinations")).toBeOnTheScreen();
  expect(await findByText("Cancun")).toBeOnTheScreen();
});
