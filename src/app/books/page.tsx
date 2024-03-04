"use client";

import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import useSessionUser from "@/hooks/useSessionUser";
import { useBooks, useBooksIds } from "../api/services/book/queries";
import { useStatusCollection } from "../api/services/collection/queries";
import { StatusCollection } from "@/types/collection";
import { Books } from "@/types/book";
import BookCard from "./components/book-card";
import { signIn } from "next-auth/react";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function BooksPage() {
  const { sessionId, session } = useSessionUser();

  const bookIdsQuery = useBooksIds();
  const bookQueries = useBooks(bookIdsQuery.data);
  const statusCollectionQuery = useStatusCollection(sessionId);

  const statusCollectionData: StatusCollection[] =
    statusCollectionQuery.data || [];

  const renderData: (Books & { status_collection: any })[] = bookQueries.map(
    ({ data }) => {
      const matchingStatus = statusCollectionData.find(
        (status) => status.bookId === data?.id
      );

      return {
        ...data,
        status_collection: matchingStatus
          ? matchingStatus.status_collection
          : false,
      };
    }
  );

  if (bookIdsQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Books" />
      <div className="flex">
        <Link href={"/categories"}>
          <Button size="sm" variant="secondary">
            See All Categories
          </Button>
        </Link>
      </div>
      <BookCard
        sessionId={sessionId}
        books={renderData}
        statusIsLoading={statusCollectionQuery.isLoading}
        statusIsPending={statusCollectionQuery.isPending}
      />
    </div>
  );
}
