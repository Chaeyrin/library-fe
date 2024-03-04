"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import {
  BookOpen,
  BookPlus,
  BookType,
  BookmarkIcon,
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";
import { usePathname } from "next/navigation";
import useSessionUser from "@/hooks/useSessionUser";

type Props = {};

export default function SideNavbar({}: Props) {
  const { sessionRole, session } = useSessionUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const pathname = usePathname();

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (["/login", "/register"].includes(pathname)) {
    return null;
  }

  // if (!session || !session.user) {
  //   return null;
  // }

  return (
    <div className="relative min-w-[80px] border-r pr-5 pl-2 pb-10 pt-20">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      {sessionRole === "user" && (
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Books",
              href: "/books",
              icon: BookOpen,
              variant: "ghost",
            },
            {
              title: "Categories",
              href: "/categories",
              icon: BookType,
              variant: "ghost",
            },
            {
              title: "Borrow",
              href: "/borrows",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "My Collection",
              href: "/my-collection",
              icon: BookmarkIcon,
              variant: "ghost",
            },
          ]}
        />
      )}
      {sessionRole === "officer" && (
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Books",
              href: "/books",
              icon: BookOpen,
              variant: "ghost",
            },
            {
              title: "Create Book",
              href: "/books/create",
              icon: BookPlus,
              variant: "ghost",
            },
            {
              title: "Categories",
              href: "/categories",
              icon: BookType,
              variant: "ghost",
            },
            {
              title: "Borrow",
              href: "/borrows",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "My Collection",
              href: "/my-collection",
              icon: BookmarkIcon,
              variant: "ghost",
            },
            {
              title: "Users",
              href: "/users",
              icon: UsersRound,
              variant: "ghost",
            },
          ]}
        />
      )}
      {sessionRole === "admin" && (
        <Nav
          isCollapsed={mobileWidth ? true : isCollapsed}
          links={[
            {
              title: "Dashboard",
              href: "/",
              icon: LayoutDashboard,
              variant: "default",
            },
            {
              title: "Books",
              href: "/books",
              icon: BookOpen,
              variant: "ghost",
            },
            {
              title: "Create Book",
              href: "/books/create",
              icon: BookPlus,
              variant: "ghost",
            },
            {
              title: "Categories",
              href: "/categories",
              icon: BookType,
              variant: "ghost",
            },
            {
              title: "Borrow",
              href: "/borrows",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "My Collection",
              href: "/my-collection",
              icon: BookmarkIcon,
              variant: "ghost",
            },
            {
              title: "Users",
              href: "/users",
              icon: UsersRound,
              variant: "ghost",
            },
            {
              title: "Create User",
              href: "/users/create",
              icon: UserPlus,
              variant: "ghost",
            },
          ]}
        />
      )}
    </div>
  );
}
