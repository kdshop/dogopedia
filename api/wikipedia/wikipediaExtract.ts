import { fetch } from "expo/fetch";
import { UseQueryOptions } from "@tanstack/react-query";
import { WIKIPEDIA_URL } from "@/api/wikipedia/CONSTANTS";

export const getWikipediaHtmlPage = (title: string) =>
  ({
    queryKey: ["wikipedia", "article", title],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(WIKIPEDIA_URL + queryKey[2]);
      return await res.json();
    },
  }) satisfies UseQueryOptions;
