/* eslint-disable @next/next/no-img-element */
import {
  useLatestBorrowAdmin,
  useLatestBorrowUser,
} from "@/app/api/services/dashboard/queries";
import { BorrowInterface } from "@/types/borrow";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { CardContent } from "./card-admin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

export default function InfoCurrentUser({ id }: any) {
  const latestBorrowAdmin = useLatestBorrowUser(id);

  return (
    <CardContent className="flex justify-between gap-4 col-span-3">
      <section>
        <div className="flex justify-between items-start">
          <div>
            <p>Your latest request provided</p>
            <p className="text-sm text-gray-400">
              Request data that has not been responded to by the admin
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                💡
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    Suggested direction
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Go to the borrowing page to view the details of your borrow
                    data
                  </p>
                </div>
                <div className="grid gap-2">
                  <Link
                    href="/borrows"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Click here
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>
      {latestBorrowAdmin.data?.map((data: BorrowInterface) => (
        <div key={data.id} className="flex flex-wrap justify-between gap-3">
          <section className="flex justify-between gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
              <img
                width={200}
                height={200}
                src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${data.user?.username}`}
                alt="avatar"
              />
            </div>
            <div className="text-sm flex-grow">
              <p>{data.user?.username}</p>
              <div className="flex flex-col text-ellipsis overflow-hidden whitespace-nowrap sm:w-auto text-gray-400">
                Submitted a request for {data.book?.book_tittle}
              </div>
            </div>
          </section>
          <p className="text-sm mt-1">
            {data.createdAt &&
              formatDistanceToNow(new Date(data.createdAt), {
                addSuffix: true,
              })}
          </p>
        </div>
      ))}
    </CardContent>
  );
}
