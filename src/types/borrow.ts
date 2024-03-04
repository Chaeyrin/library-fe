import { Books } from "./book";
import { UserResponse } from "./user";

export interface BorrowInterface {
  id?: number;
  userId?: number | string;
  bookId?: number | string;
  quantity_borrowed?: number | string;
  borrowing_date?: string | Date;
  return_date?: string | Date;
  borrowing_status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserResponse;
  book?: Books;
}
