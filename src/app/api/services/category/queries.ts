import { useQueries, useQuery } from "@tanstack/react-query";
import { getCategoriesIds, getCategory, getCategoryValue } from "./api";

export function useCategoriesIds() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesIds,
  });
}

export function useCategories(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["category", { id }],
        queryFn: () => getCategory(id!),
      };
    }),
  });
}

export function useCategory(id: number | undefined) {
  return useQuery({
    queryKey: ["category", { id }],
    queryFn: () => getCategory(id!),
  });
}

export function useCategoriesValue() {
  return useQuery({
    queryKey: ["category-value"],
    queryFn: getCategoryValue,
  });
}
