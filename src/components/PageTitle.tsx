import { cn } from "@/lib/utils";
import React from "react";
import { Search } from "./TopNavbar/search";
import { UserNav } from "./TopNavbar/user-nav";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <div className="border-b mb-1">
      <div className="flex items-center justify-between h-16">
        <h1 className={cn("text-2xl font-semibold mb-4", className)}>
          {title}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          {/* <Search /> */}
          <UserNav />
        </div>
      </div>
    </div>
  );
}
