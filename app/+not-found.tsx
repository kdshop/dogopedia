import { View, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Link href={"/"}>Go Back</Link>
      <Image
        source={require("@/assets/images/not-found.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  image: { resizeMode: "contain", width: 300, height: 300 },
});
