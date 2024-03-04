"use client";

import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import DetailCategoryCard from "../../components/category-detail-card";
import { useCategory } from "@/app/api/services/category/queries";
import { Button } from "@/components/ui/button";
import GoToLoginPage from "@/components/GoToLoginPage";
import useSessionUser from "@/hooks/useSessionUser";

export default function DetailCategory(props: any) {
  const { session } = useSessionUser();
  const { params } = props;
  const categoryQuery = useCategory(params.id);

  const books = categoryQuery.data?.books?.map((book) => {
    return {
      id: book.id || "",
      title: book.book_tittle,
      author: book.author,
      publisher: book.publisher,
      yearPublished: book.year_published,
      quantity: book.stock,
      url: book.url,
    };
  });

  const pageTitle = `Category Book ${categoryQuery.data?.category_title}`;

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (categoryQuery.isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title={pageTitle} />
      <DetailCategoryCard
        books={books}
        category={categoryQuery.data}
        categoryId={params.id}
      />
    </div>
  );
}
