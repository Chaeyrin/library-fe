/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CollectionCard({ books }: any) {
  return (
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
              <h3 className="font-medium leading-none">{data?.book_title}</h3>
              <p className="text-xs text-muted-foreground">{data?.author}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
