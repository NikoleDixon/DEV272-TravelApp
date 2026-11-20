import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { useDestinations } from "../hooks/useDestinations";

jest.mock("../api/destinations", () => ({
  fetchDestinations: jest.fn().mockResolvedValue([
    { id: "1", name: "Test Destination" },
    { id: "2", name: "Another Destination" },
  ]),
}));

test("useDestinations returns destinations from the API", async () => {
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
    expect(result.current.data).toHaveLength(2);
  });
});
