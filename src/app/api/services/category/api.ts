import { axiosInstance } from "@/lib/axios/axios-instance";
import { Category } from "@/types/category";

export const getCategoriesIds = async () => {
  return (await axiosInstance.get<Category[]>("category")).data.map(
    (collection) => collection.id
  );
};

export const getCategory = async (id: number) => {
  return (await axiosInstance.get<Category>(`category/${id}`)).data;
};

export const getCategoryValue = async () => {
  return (await axiosInstance.get<Category[]>(`category-value`)).data;
};

export const createCategory = async (data: Category) => {
  return await axiosInstance.post<Category>("category", data);
};

export const deleteCategory = async (id: number) => {
  return await axiosInstance.delete(`category/${id}`);
};
