/* eslint-disable @next/next/no-img-element */
"use client";

import PageTitle from "@/components/PageTitle";
import { useUserCollection } from "../api/services/collection/queries";
import useSessionUser from "@/hooks/useSessionUser";
import CollectionCard from "./components/collection-card";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function MyCollection() {
  const { sessionId, session } = useSessionUser();
  const userCollectionQuery = useUserCollection(sessionId);

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Books" />
      <CollectionCard books={userCollectionQuery.data} />
    </div>
  );
}
