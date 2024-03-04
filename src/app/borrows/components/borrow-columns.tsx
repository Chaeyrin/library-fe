/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import {
  useCancelBorrow,
  useReturnBorrow,
} from "@/app/api/services/borrow/mutation";

export const columns: ColumnDef<any>[] = [
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
          statusMessage = borrowingStatus + "  🆗";
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

      const cancelBorrowMutation = useCancelBorrow();
      const returnBorrowMutation = useReturnBorrow();

      const handleAccept = () => {
        console.log("Button clicked!", borrow);
      };

      const handleCancel = async () => {
        await cancelBorrowMutation.mutateAsync(borrow.id);
      };

      const handleReturn = () => {
        returnBorrowMutation.mutate({ id: borrow.id });
      };

      if (borrow.userRole === "admin" || borrow.serRole === "officer") {
        if (borrow.borrowing_status === "pending") {
          return (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleAccept}>
                ✔️
              </Button>
              <Button variant="secondary" size="icon">
                ❌
              </Button>
            </div>
          );
        }
        if (borrow.borrowing_status === "returning") {
          return (
            <Button variant="outline" size="sm">
              receive book
            </Button>
          );
        }
      }

      if (borrow.userRole === "user") {
        if (borrow.borrowing_status === "rejected") {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={cancelBorrowMutation.isPending}
            >
              {cancelBorrowMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Delete 🗑️"
              )}
            </Button>
          );
        }
        if (borrow.borrowing_status === "pending") {
          return (
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel 🚫
            </Button>
          );
        }
        if (borrow.borrowing_status === "borrowed") {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReturn}
              disabled={returnBorrowMutation.isPending}
            >
              {returnBorrowMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Return Book"
              )}
            </Button>
          );
        }
      }
    },
  },
];
