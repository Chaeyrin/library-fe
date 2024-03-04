import { useQuery } from "@tanstack/react-query";
import { getRating, getReview, getUserReview } from "./api";

export function useReview(id: number | null) {
  return useQuery({
    queryKey: ["review", { id }],
    queryFn: () => getReview(id!),
  });
}

export function useUserReview({ bookId, userId }: any) {
  return useQuery({
    queryKey: ["user-review", { bookId, userId }],
    queryFn: () => getUserReview({ bookId, userId }),
  });
}

export function useRating(id: number | null) {
  return useQuery({
    queryKey: ["rating", { id }],
    queryFn: () => getRating(id!),
  });
}
