import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { useDestinations } from "../hooks/useDestinations";

test("useDestinations returns the sample destinations", async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result } = await renderHook(() => useDestinations(), { wrapper });

  await waitFor(() => {
    expect(result.current.data).toBeDefined();
  });

  expect(result.current.data?.length).toBe(9);
});
