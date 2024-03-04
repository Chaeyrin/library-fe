import { useCardInfoAdmin } from "@/app/api/services/dashboard/queries";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  BookOpen,
  PlusCircle,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";

export default function CardInfoAdmin() {
  const cardInfo = useCardInfoAdmin();

  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">Books Available</p>
          <BookOpen />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <PlusCircle color="green" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.totalQuantityAvailable}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Total amount of book data available
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
              {cardInfo.data?.totalQuantityBorrowed}
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Total books currently on borrowed
          </p>
        </section>
      </CardContent>
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">Users</p>
          <User />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <Users color="blue" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.userCount}
            </h2>
          </div>
          <p className="text-xs text-gray-500">Total registered users</p>
        </section>
      </CardContent>
      <CardContent>
        <section className="flex justify-between gap-2">
          <p className="text-sm">Officers</p>
          <User />
        </section>
        <section className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              <UserCheck color="purple" />
            </h2>
            <h2 className="text-2xl font-semibold ml-2">
              {cardInfo.data?.officerCount}
            </h2>
          </div>
          <p className="text-xs text-gray-500">Total registered officers</p>
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
