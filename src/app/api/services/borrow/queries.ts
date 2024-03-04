import { useQuery } from "@tanstack/react-query";
import { getBorrows, getBorrowsByUser, statusBorrow } from "./api";

export function useBorrowStatus({ bookId, userId }: any) {
  return useQuery({
    queryKey: ["borrowStatus", { bookId, userId }],
    queryFn: () => statusBorrow({ bookId, userId }),
  });
}

export function useBorrows() {
  return useQuery({
    queryKey: ["borrows"],
    queryFn: getBorrows,
  });
}

export function useBorrowsByUser(id: number) {
  return useQuery({
    queryKey: ["borrows-user", { id }],
    queryFn: () => getBorrowsByUser(id!),
  });
}
