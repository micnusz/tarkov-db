// lib/get-query-client.ts
import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 2000, // 1 minuta
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Global cache for browser (Client Components)
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  // typeof window === "undefined" => ssr
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
