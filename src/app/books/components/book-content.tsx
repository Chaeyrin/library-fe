import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

export default function BookContent({ bookData }: any) {
  const category = bookData?.book_categories?.map((category: any) => {
    return {
      categoryId: category.id,
      category_title: category.category_title,
    };
  });

  return (
    <div className="border-y border-gray-300  mt-5 py-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Categories about {bookData?.book_tittle} book
      </h4>
      <div className=" py-3 flex flex-row">
        {category?.length ? (
          category.map((category: any) => (
            <div key={category.categoryId} className="mr-3">
              <Link
                href={`/categories/detail/${category.categoryId}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {category.category_title}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            this book doesn&apos;t have any categories yet
          </p>
        )}
      </div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-2">
        Status book stock
      </h4>
      <div className="flex mt-2">
        <p className="text-base">
          Number of Books Available:{" "}
          <span className="font-bold">
            {bookData?.book_stock?.quantity_available}
          </span>
        </p>
        <p className="ml-4 text-base">
          Number of Books Currently on Borrowed:{" "}
          <span className="font-bold">
            {bookData?.book_stock?.quantity_borrowed}
          </span>
        </p>
      </div>
    </div>
  );
}
