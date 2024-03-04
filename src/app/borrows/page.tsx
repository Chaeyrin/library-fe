"use client";

import React from "react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BorrowInterface } from "@/types/borrow";
import { ColumnDef } from "@tanstack/react-table";
import { useBorrows, useBorrowsByUser } from "../api/services/borrow/queries";
import { DataTable } from "./components/borrow-data-table";
import AcceptBorrow from "./components/accept-button";
import ReturnBorrow from "./components/return-button";
import DeleteBorrow from "./components/delete-button";
import CancelBorrow from "./components/cancel-button";
import ReceiveBorrow from "./components/receive-button";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue(
                "user"
              )}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>{row.getValue("user")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "borrowing_status",
    header: "Message",
    cell: ({ row }) => {
      const borrowingStatus = row.getValue("borrowing_status");

      let message = "";
      switch (borrowingStatus) {
        case "pending":
          message = "User submits a book borrow request";
          break;
        case "rejected":
          message = "Borrowing application rejected";
          break;
        case "borrowed":
          message = "User is borrowing a book";
          break;
        case "returning":
          message = "User wants to return the borrowed book";
          break;
        case "completed":
          message = "Transaction completed";
          break;
        default:
          message = "Status unknown";
      }

      return (
        <div>
          <p>{message}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "borrowing_status",
    header: "Status",
    cell: ({ row }) => {
      const borrowingStatus = row.getValue("borrowing_status");

      let statusColor = "";
      let statusMessage = borrowingStatus;

      switch (borrowingStatus) {
        case "pending":
          statusColor = "bg-slate-300";
          statusMessage = borrowingStatus + "...  📩";
          break;
        case "rejected":
          statusColor = "bg-red-300";
          statusMessage = borrowingStatus + "  🚫";
          break;
        case "borrowed":
          statusColor = "bg-amber-300";
          statusMessage = borrowingStatus + "  ⏳";
          break;
        case "returning":
          statusColor = "bg-lime-300";
          statusMessage = borrowingStatus + "...  ✅";
          break;
        case "completed":
          statusColor = "bg-green-300";
          statusMessage = borrowingStatus + "  ✔️";
          break;
      }

      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", statusColor)}
        >
          {statusMessage as string}
        </div>
      );
    },
  },
  {
    accessorKey: "book_title",
    header: "Book",
  },
  {
    accessorKey: "quantity_borrowed",
    header: "Quantity",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const borrow = row.original;

      if (borrow.userRole === "admin" || borrow.serRole === "officer") {
        if (borrow.borrowing_status === "pending") {
          return <AcceptBorrow bookId={borrow.id} />;
        }
        if (borrow.borrowing_status === "returning") {
          return <ReceiveBorrow bookId={borrow.id} />;
        }
      }

      if (borrow.userRole === "user") {
        if (borrow.borrowing_status === "rejected") {
          return <DeleteBorrow bookId={borrow.id} />;
        }
        if (borrow.borrowing_status === "pending") {
          return <CancelBorrow bookId={borrow.id} />;
        }
        if (borrow.borrowing_status === "borrowed") {
          return <ReturnBorrow bookId={borrow.id} />;
        }
      }
    },
  },
];

export default function OrdersPage() {
  const { sessionId, sessionRole, session } = useSessionUser();

  const borrowQuery = useBorrows();
  const userBorrowQuery = useBorrowsByUser(sessionId);

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (borrowQuery.isLoading || userBorrowQuery.isLoading) {
    return <Spinner />;
  }

  function mapBorrowData(data: BorrowInterface) {
    return {
      id: data?.id,
      userId: data?.userId,
      bookId: data?.bookId,
      quantity_borrowed: data?.quantity_borrowed,
      borrowing_date: data?.quantity_borrowed,
      return_date: data?.return_date,
      borrowing_status: data?.borrowing_status,
      user: data?.user?.username,
      book_title: data?.book?.book_tittle,
      userRole: sessionRole,
    };
  }

  function renderData() {
    if (sessionRole === "user") {
      return userBorrowQuery.data?.map(mapBorrowData) || [];
    } else if (sessionRole === "admin" || sessionRole === "officer") {
      return borrowQuery.data?.map(mapBorrowData) || [];
    } else {
      return [];
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Orders" />
      <DataTable columns={columns} data={renderData()} />
    </div>
  );
}
