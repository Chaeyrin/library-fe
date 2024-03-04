"use client";

import Spinner from "@/components/Spinner";
import PageTitle from "@/components/PageTitle";
import ReviewTextareaForm from "../../components/review-text-area-form";
import ReviewDrawer from "../../components/review-drawer";
import BookButtonOption from "../../components/book-button-option";
import BookUpdateForm from "../../components/book-update-form";
import BookContent from "../../components/book-content";
import { useSession } from "next-auth/react";
import { useBook } from "@/app/api/services/book/queries";
import {
  useRating,
  useReview,
  useUserReview,
} from "@/app/api/services/review/queries";
import { useBorrowStatus } from "@/app/api/services/borrow/queries";
import { useCategoriesValue } from "@/app/api/services/category/queries";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function CreateBookPage(props: any) {
  const { params } = props;
  const { data: session }: any = useSession();

  const bookId = params.id;
  const userId = session?.user.id;
  const role = session?.user.role;

  const bookQuery = useBook(bookId);
  const ratingQuery = useRating(bookId);
  const borrowStatusQuery = useBorrowStatus({ bookId, userId });
  const useCategoriesQuery = useCategoriesValue();
  const reviewQuery = useReview(bookId);
  const userReviewQuery = useUserReview({ bookId, userId });

  const renderCategory = bookQuery.data?.book_categories?.map((category) => {
    return {
      categoryId: category.id,
      category_title: category.category_title,
    };
  });

  const pageTitle = `Detail Book of ${bookQuery.data?.book_tittle}`;

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (bookQuery.isLoading || ratingQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title={pageTitle} />
      <BookButtonOption
        bookData={bookQuery.data}
        bookId={bookId}
        sessionId={userId}
        sessionRole={role}
        status={borrowStatusQuery.data}
        statusIsLoading={borrowStatusQuery.isLoading}
        statusIsPending={borrowStatusQuery.isPending}
      />
      <BookUpdateForm
        bookData={bookQuery.data}
        bookId={bookId}
        userRole={role}
        categoryData={useCategoriesQuery.data}
        categoryById={renderCategory}
      />
      <BookContent bookData={bookQuery.data} />
      <ReviewDrawer
        ratingData={ratingQuery.data}
        reviewData={reviewQuery.data}
      />
      {userReviewQuery.isLoading ? (
        "loading..."
      ) : (
        <ReviewTextareaForm
          bookId={bookId}
          userId={userId}
          userReviewData={userReviewQuery.data}
        />
      )}
    </div>
  );
}
