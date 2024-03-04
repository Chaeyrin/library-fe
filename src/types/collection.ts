import { Books } from "./book";
import { UserResponse } from "./user";

export interface Collection {
  id?: number;
  userId?: number;
  bookId?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: UserResponse;
  book?: Books;
}

export interface StatusCollection {
  bookId: number;
  status_collection: boolean;
}
