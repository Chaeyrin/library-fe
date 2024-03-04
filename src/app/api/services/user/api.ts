import { axiosInstance } from "@/lib/axios/axios-instance";
import { LoginUser, UserRequest, UserResponse } from "@/types/user";

export const getUsersIds = async () => {
  return (await axiosInstance.get<UserResponse[]>("/users")).data.map(
    (user) => user.id
  );
};

export const getUser = async (id: number) => {
  return (await axiosInstance.get<UserResponse>(`/users/${id}`)).data;
};

export const createUser = async (data: UserRequest) => {
  return await axiosInstance.post("/users", data);
};

export const registerAsUser = async (data: UserRequest) => {
  return await axiosInstance.post("/register", data);
};

export const updateUser = async (data: UserRequest) => {
  await axiosInstance.patch(`users/${data.id}`, data);
};

export const deleteUser = async (id: number) => {
  await axiosInstance.delete(`users/${id}`);
};

export const loginUser = async (data: LoginUser) => {
  return await axiosInstance.post("/login", data);
};
