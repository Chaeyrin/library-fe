import { useQuery } from "@tanstack/react-query";
import {
  getCardInfoAdmin,
  getCardInfoUser,
  getChartAdmin,
  getChartUser,
  getLatestBorrowAdmin,
  getLatestBorrowUser,
} from "./api";

export function useDashboardAdmin() {
  return useQuery({
    queryKey: ["dashboard-admin"],
    queryFn: getChartAdmin,
  });
}

export function useLatestBorrowAdmin() {
  return useQuery({
    queryKey: ["latest-borrow"],
    queryFn: getLatestBorrowAdmin,
  });
}

export function useCardInfoAdmin() {
  return useQuery({
    queryKey: ["card-admin"],
    queryFn: getCardInfoAdmin,
  });
}

/** USER */
export function useDashboardUser(id: number | undefined) {
  return useQuery({
    queryKey: ["dashboard-user", { id }],
    queryFn: () => getChartUser(id!),
  });
}

export function useCardInfoUser(id: number | undefined) {
  return useQuery({
    queryKey: ["card-user", { id }],
    queryFn: () => getCardInfoUser(id!),
  });
}

export function useLatestBorrowUser(id: number | undefined) {
  return useQuery({
    queryKey: ["latest-borrow-user", { id }],
    queryFn: () => getLatestBorrowUser(id!),
  });
}
