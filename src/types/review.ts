export interface ReviewInterface {
  id?: number;
  userId?: number;
  bookId?: number;
  review_message?: string;
  rating?: number | string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: number;
    username: string;
  };
}

export interface RatingInterface {
  averageRating: number;
  totalReviews: number;
}
