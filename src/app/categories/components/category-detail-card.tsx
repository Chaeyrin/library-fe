import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useSessionUser from "@/hooks/useSessionUser";
import { useDeleteCategory } from "@/app/api/services/category/mutation";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
export default function DetailCategoryCard({
  category,
  books,
  categoryId,
}: any) {
  const { sessionRole } = useSessionUser();
  const router = useRouter();
  const onlyOfficerAdmin = sessionRole === "admin" || sessionRole === "officer";

  const deleteCategory = useDeleteCategory();

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory.mutateAsync(id);
    router.push("/categories");
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <p className="leading-7 [&:not(:first-child)]:mt-1">
          <span className="font-bold">Description about this category:</span>{" "}
          {category.category_description}
        </p>
        {onlyOfficerAdmin && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this book and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {category && category.id && (
                  <AlertDialogAction
                    onClick={() => handleDeleteCategory(category.id!)}
                  >
                    Continue
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-5">
        {books?.map((data: any) => (
          <div key={data?.id} className="overflow-hidden rounded-md space-y-5">
            <Link href={`/books/detail/${data?.id}`}>
              <img
                src={data?.url || "/img/create-book.jpg"}
                alt="books"
                width={250}
                height={330}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  "aspect-[3/4]"
                )}
              />
            </Link>
            <div className="space-y-1 text-sm flex justify-between">
              <div>
                <h3 className="font-medium leading-none">{data?.title}</h3>
                <p className="text-xs text-muted-foreground">{data?.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
