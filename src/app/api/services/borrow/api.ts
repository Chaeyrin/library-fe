import { axiosInstance } from "@/lib/axios/axios-instance";
import { BorrowInterface } from "@/types/borrow";

export const statusBorrow = async ({ bookId, userId }: any) => {
  return (await axiosInstance.get(`borrowing-book/${bookId}/${userId}`)).data;
};

export const getBorrows = async () => {
  return (await axiosInstance.get<BorrowInterface[]>("borrowing")).data;
};

export const getBorrowsByUser = async (id: number) => {
  return (await axiosInstance.get<BorrowInterface[]>(`borrowing-user/${id}`))
    .data;
};

export const applyBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.post("borrowing", data);
};

export const cancelBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.delete(`borrowing/${data.id}`);
};

export const returnBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.patch(`borrowing-returning/${data.id}`, data);
};

export const acceptBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.patch(`borrowing-approved/${data.id}`, data);
};

export const rejectBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.patch(`borrowing-rejected/${data.id}`, data);
};

export const receiveBorrow = async (data: BorrowInterface) => {
  return await axiosInstance.patch(`borrowing-completed/${data.id}`, data);
};
