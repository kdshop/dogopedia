import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wikipedia } from "@/api";

export default function BreedDetailsDescription() {
  const params = useLocalSearchParams();
  const { breed = "mix" } = params;

  const wikipediaArticle = useSuspenseQuery({
    ...wikipedia.getWikipediaHtmlPage(String(breed).replace(/\//g, "_")),
  });

  // @ts-ignore
  const extract = Object.values(wikipediaArticle.data.query.pages)[0]
    .extract as string;
  return <Text style={styles.text}>{extract}</Text>;
}

const styles = StyleSheet.create({
  text: {
    margin: "auto",
  },
});
