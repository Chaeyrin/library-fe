import { axiosInstance } from "@/lib/axios/axios-instance";
import { BorrowInterface } from "@/types/borrow";
import { CardInfo, CardInfoUser } from "@/types/dashboard";

export const getChartAdmin = async () => {
  return (await axiosInstance.get<any>("dashboard")).data;
};

export const getLatestBorrowAdmin = async () => {
  return (await axiosInstance.get<BorrowInterface[]>("dashboard-borrow")).data;
};

export const getCardInfoAdmin = async () => {
  return (await axiosInstance.get<CardInfo>("dashboard-card")).data;
};

/** USER */
export const getChartUser = async (id: number) => {
  return (await axiosInstance.get<any>(`dashboard-user/${id}`)).data;
};

export const getCardInfoUser = async (id: number) => {
  return (await axiosInstance.get<CardInfoUser>(`dashboard-card-user/${id}`))
    .data;
};

export const getLatestBorrowUser = async (id: number) => {
  return (
    await axiosInstance.get<BorrowInterface[]>(`dashboard-borrow-user/${id}`)
  ).data;
};
