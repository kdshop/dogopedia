import { StyleSheet, useWindowDimensions } from "react-native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dog } from "@/api";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BreedImageCarousel() {
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const { breed = "mix" } = params;
  const breeds = useSuspenseQuery({
    ...dog.randomBreedImageOptionsQueryOptions(String(breed)),
  });
  const leftValue = useSharedValue(0);
  const swipe = Gesture.Pan()
    .onChange((val) => {
      console.log(val.x - width / 2);
      leftValue.set(val.changeX + leftValue.value);
    })
    .onFinalize(() => breeds.refetch().finally(() => leftValue.set(0)));
  const imageStyle = useAnimatedStyle(() => ({
    left: withSpring(leftValue.value),
  }));

  return (
    <GestureDetector gesture={swipe}>
      <SafeAreaView style={styles.wrapper}>
        <Animated.Image
          source={{ uri: breeds.data }}
          resizeMode={"contain"}
          style={[imageStyle, styles.image]}
        />
      </SafeAreaView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  image: {
    width: "100%",
    height: "80%",
  },
});
