/* eslint-disable @next/next/no-img-element */
import {
  useCreateCollection,
  useDeleteCollection,
} from "@/app/api/services/collection/mutations";
import { cn } from "@/lib/utils";
import { BookmarkPlus, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({
  sessionId,
  books,
  statusIsLoading,
  statusIsPending,
}: any) {
  const createCollectionMutation = useCreateCollection();
  const deleteCollectionMutation = useDeleteCollection();

  const handleAddCategory = (bookId: number | string) => {
    createCollectionMutation.mutate({
      userId: Number(sessionId),
      bookId: Number(bookId),
    });
  };

  const handleRemoveCategory = async (bookId: number | string) => {
    await deleteCollectionMutation.mutateAsync({
      userId: Number(sessionId),
      bookId: Number(bookId),
    });
  };

  return (
    <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-5">
      {books.map((data: any) => (
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
              <h3 className="font-medium leading-none">{data?.book_tittle}</h3>
              <p className="text-xs text-muted-foreground">{data?.author}</p>
            </div>
            <div>
              {statusIsLoading ? (
                <button type="button" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </button>
              ) : (
                <>
                  {data?.status_collection === true && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(data?.id ?? "")}
                      disabled={statusIsPending}
                    >
                      {statusIsPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <BookmarkPlus color="yellow" />
                      )}
                    </button>
                  )}
                  {data?.status_collection === false && (
                    <button
                      type="button"
                      onClick={() => handleAddCategory(data?.id ?? "")}
                      disabled={statusIsPending}
                    >
                      {statusIsPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <BookmarkPlus color="black" />
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
