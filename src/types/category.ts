import { Books } from "./book";

export interface Category {
  id?: number;
  category_title?: string;
  category_description?: string;
  createdAt?: string;
  updatedAt?: string;
  books?: Books[];
  message?: string;
}

export interface CategoryResponse {
  id: number;
  category_title: string;
  category_description: string;
  createdAt: string;
  updatedAt: string;
  books: Book[];
}

interface Book {
  id: number;
  book_tittle: string;
  author: string;
  publisher: string;
  quantity: any;
  url: string;
  year_published: string;
  createdAt: string;
  updatedAt: string;
}
