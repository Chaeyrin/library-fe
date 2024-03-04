"use client";

import PageTitle from "@/components/PageTitle";
import {
  useCategories,
  useCategoriesIds,
} from "../api/services/category/queries";
import CreateCategoryForm from "./components/create-category-form";
import CategoryCard from "./components/category-card";
import Spinner from "@/components/Spinner";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function Categories() {
  const { session } = useSessionUser();
  const categoryIdsQuery = useCategoriesIds();
  const categoryQueries = useCategories(categoryIdsQuery.data);

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (categoryIdsQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Categories of Books" />
      <CreateCategoryForm />
      <CategoryCard categoryData={categoryQueries} />
    </div>
  );
}
