import { axiosInstance } from "@/lib/axios/axios-instance";
import { Books, MyCollection } from "@/types/book";
import { Collection, StatusCollection } from "@/types/collection";
import { AxiosRequestConfig } from "axios";

export const getCollectionIds = async () => {
  return (await axiosInstance.get<Collection[]>("collection")).data.map(
    (collection) => collection.id
  );
};

export const getCollection = async (id: number) => {
  return (await axiosInstance.get<Collection[]>(`collection/${id}`)).data[0];
};

export const getStatusCollection = async (id: number) => {
  return (
    await axiosInstance.get<StatusCollection[]>(`status-collection/${id}`)
  ).data;
};

export const getUserCollectionUser = async (userId: number) => {
  return (await axiosInstance.get<any>(`user-collection/${userId}`)).data;
};

export const createCollection = async (data: Collection) => {
  await axiosInstance.post("collection", data);
};

export const deleteCollection = async (data: Collection) => {
  const config: AxiosRequestConfig = {
    data: data,
  };

  await axiosInstance.delete("collection", config);
};
