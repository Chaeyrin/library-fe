import { Category } from "./category";
import { Collection } from "./collection";

export interface Books {
  id?: number;
  book_tittle?: string;
  author?: string;
  publisher?: string;
  year_published?: any;
  createdAt?: string;
  updatedAt?: string;
  image?: any;
  url?: string;
  data_image?: any;
  stock?: string;
  book_stock?: {
    quantity_available: number;
    quantity_borrowed: number;
  };
  my_book_collections?: { userId?: number }[];
  category?: { value: string }[];
  book_categories?: Category[];
}

export interface MyCollection {
  id?: number;
  bookId?: number;
  book_title?: string;
  author?: string;
  publisher?: string;
  year_published?: Date;
  image?: string;
  url?: string;
}
