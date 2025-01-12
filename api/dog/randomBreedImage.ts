import { fetch } from "expo/fetch";
import { UseQueryOptions } from "@tanstack/react-query";
import { DOG_API_URL } from "@/api/dog/CONSTANTS";

export const randomBreedImageOptionsQueryOptions = (breedName: string) =>
  ({
    queryKey: ["dog-api", "randomBreedImage", breedName],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(
        DOG_API_URL + `/breed/${queryKey[2]}/images/random`,
      );
      const data = await res.json();
      return data.message as string;
    },
  }) satisfies UseQueryOptions;
