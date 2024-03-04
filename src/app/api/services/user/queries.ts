import { useQueries, useQuery } from "@tanstack/react-query";
import { getUser, getUsersIds } from "./api";

export function useUsersIds() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersIds,
  });
}

export function useUser(id: number | undefined) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async () => await getUser(id!),
  });
}

export function useUsers(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["user", { id }],
        queryFn: async () => await getUser(id!),
      };
    }),
  });
}
