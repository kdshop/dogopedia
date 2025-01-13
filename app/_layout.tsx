import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState<QueryClient>(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="index" redirect />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </QueryClientProvider>
  );
}
