"use client";

import PageTitle from "@/components/PageTitle";
import BookCreateForm from "../components/book-create-form";
import { useCategoriesValue } from "@/app/api/services/category/queries";
import { useCreateBook } from "@/app/api/services/book/mutation";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";
import ForbiddenAccess from "@/components/403";

export default function CreateBookPage() {
  const { sessionRole, session } = useSessionUser();
  const useCategoriesQuery = useCategoriesValue();
  const createBookMutation = useCreateBook();

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (sessionRole === "user") {
    return <ForbiddenAccess />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Create Book" />
      <BookCreateForm
        categoryData={useCategoriesQuery.data}
        createData={createBookMutation.mutateAsync}
        isPending={createBookMutation.isPending}
      />
    </div>
  );
}
