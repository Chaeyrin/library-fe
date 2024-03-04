/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { DataTable } from "./components/data-table";
import { useUsers, useUsersIds } from "../api/services/user/queries";
import { columns } from "./components/columns";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function UsersPage() {
  const { session } = useSessionUser();
  const userIdsQuery = useUsersIds();
  const userQueries = useUsers(userIdsQuery.data);

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  function renderUsers() {
    return (
      userQueries.map(({ data }) => ({
        id: data?.id,
        full_name: data?.full_name,
        email: data?.email,
        username: data?.username,
      })) || []
    );
  }

  if (userIdsQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Users" />
      <DataTable columns={columns} data={renderUsers()} />
    </div>
  );
}
