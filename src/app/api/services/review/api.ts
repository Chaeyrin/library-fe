import { axiosInstance } from "@/lib/axios/axios-instance";
import { RatingInterface, ReviewInterface } from "@/types/review";

export const getReviews = async () => {
  return (await axiosInstance.get<ReviewInterface[]>("review")).data;
};

export const getReview = async (id: number) => {
  return (await axiosInstance.get<ReviewInterface[]>(`review/${id}`)).data;
};

export const getUserReview = async ({ bookId, userId }: any) => {
  return (
    await axiosInstance.get<ReviewInterface>(`user-review/${bookId}/${userId}`)
  ).data;
};

export const getRating = async (id: number) => {
  return (await axiosInstance.get<RatingInterface>(`review-rating/${id}`)).data;
};

export const createReview = async (data: ReviewInterface) => {
  return await axiosInstance.post("/review", data);
};

export const deleteReview = async (data: ReviewInterface) => {
  await axiosInstance.delete(`/review/${data.id}`);
};
