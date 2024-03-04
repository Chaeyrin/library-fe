import {
  useCardInfoAdmin,
  useCardInfoUser,
} from "@/app/api/services/dashboard/queries";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  BookMarked,
  BookOpen,
  BookmarkCheck,
  Loader,
  PlusCircle,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";

export default function CardInfoUser({ id }: any) {
  const cardInfo = useCardInfoUser(id);

  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3">
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">Pending</p>
          <BookOpen />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <Loader color="gray" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.totalPendingBorrowings}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Total books you&apos;re waiting for
          </p>
        </section>
      </CardContent>
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">Books Borrowed</p>
          <BookOpen />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <ArrowUpDown color="orange" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.totalBorrowed}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Total books you are currently borrowing
          </p>
        </section>
      </CardContent>
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">My Collection</p>
          <BookOpen />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <BookmarkCheck color="yellow" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.totalCollection}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Total collection of your books
          </p>
        </section>
      </CardContent>
    </section>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
