import { fetch } from "expo/fetch";
import { UseQueryOptions } from "@tanstack/react-query";
import { DOG_API_URL } from "@/api/dog/CONSTANTS";
interface AllBreeds {
  [key: string]: string[];
}
function getBreeds() {
  return fetch(DOG_API_URL + "/breeds/list/all")
    .then((res) => res.json())
    .then((data) => data.message as AllBreeds);
}

export const breedsQueryOptions = {
  queryKey: ["dog-api", "breeds"],
  queryFn: getBreeds,
} satisfies UseQueryOptions;
