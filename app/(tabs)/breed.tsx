import { Text, View, StyleSheet, Image } from "react-native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dog, wikipedia } from "@/api";
import { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Breeds() {
  const params = useLocalSearchParams();
  const { breed = "mix" } = params;
  const breeds = useSuspenseQuery({
    ...dog.randomBreedImageOptionsQueryOptions(String(breed)),
    refetchInterval: 2000,
  });

  const wikipediaArticle = useSuspenseQuery({
    ...wikipedia.getWikipediaHtmlPage(String(breed).replace(/\//g, "_")),
  });

  // @ts-ignore
  const extract = Object.values(wikipediaArticle.data.query.pages)[0]
    .extract as string;

  return (
    <Suspense fallback={<div>hehe?</div>}>
      <View style={styles.wrapper}>
        <Image source={{ uri: breeds.data }} style={styles.image} />
        <Text style={styles.text}>{extract}</Text>
      </View>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
    width: "100%",
    height: "80%",
  },
  wrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  text: {
    margin: "auto",
  },
});
