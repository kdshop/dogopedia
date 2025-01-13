import { View, FlatList, StyleSheet, Text, StatusBar } from "react-native";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dog } from "@/api";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BreedList() {
  const breeds = useSuspenseQuery(dog.breedsQueryOptions);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(breeds.data)}
        renderItem={(breed) => (
          <View key={breed.index} style={{ padding: 20, borderWidth: 1 }}>
            {breed.item[1].length > 0 ? (
              breed.item[1].map((subBreed) => (
                <Link
                  style={{ padding: 20, borderWidth: 1 }}
                  key={subBreed}
                  href={{
                    pathname: "/breed",
                    params: { breed: `${breed.item[0]}/${subBreed}` },
                  }}
                >
                  <Text>
                    {subBreed} {breed.item[0]}
                  </Text>
                </Link>
              ))
            ) : (
              <Link
                href={{
                  pathname: "/breed",
                  params: { breed: breed.item[0] },
                }}
              >
                <Text>{breed.item[0]}</Text>
              </Link>
            )}
          </View>
        )}
        keyExtractor={(item) => item[0]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
