import { useQueries, useQuery } from "@tanstack/react-query";
import { getBook, getBooksIds } from "./api";

export function useBooksIds() {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooksIds,
  });
}

export function useBook(id: number | undefined) {
  return useQuery({
    queryKey: ["book", { id }],
    queryFn: async () => await getBook(id!),
  });
}

export function useBooks(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["book", { id }],
        queryFn: async () => await getBook(id!),
      };
    }),
  });
}
