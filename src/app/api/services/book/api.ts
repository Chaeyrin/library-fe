import { axiosInstance } from "@/lib/axios/axios-instance";
import { Books } from "@/types/book";

export const getBooksIds = async () => {
  return (await axiosInstance.get<Books[]>("books")).data.map(
    (collection) => collection.id
  );
};

export const getBook = async (id: number) => {
  return (await axiosInstance.get<Books>(`books/${id}`)).data;
};

export const createBook = async (data: Books) => {
  return await axiosInstance.post("books", data, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const updateBook = async (data: Books) => {
  return await axiosInstance.patch(`books/${data.id}`, data);
};

export const deleteBook = async (id: number) => {
  return await axiosInstance.delete(`books/${id}`);
};
