import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Suspense } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Suspense fallback={null}>
          <Tabs>
            <Tabs.Screen name="breed-list" />
            <Tabs.Screen name="breed" />
          </Tabs>
        </Suspense>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
