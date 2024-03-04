import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getCollection,
  getCollectionIds,
  getStatusCollection,
  getUserCollectionUser,
} from "./api";

export function useCollectionIds() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionIds,
  });
}

export function useCollections(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["collection", { id }],
        queryFn: () => getCollection(id!),
      };
    }),
  });
}

export function useUserCollection(userId: number | undefined) {
  return useQuery({
    queryKey: ["userCollection", { userId }],
    queryFn: () => getUserCollectionUser(userId!),
  });
}

export function useStatusCollection(userId: number | undefined) {
  return useQuery({
    queryKey: ["status-collection", { userId }],
    queryFn: () => getStatusCollection(userId!),
  });
}
