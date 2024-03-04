"use client";

import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { useUser } from "@/app/api/services/user/queries";
import FormUpdateUser from "../../components/user-update-form";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";

export default function DetailUser(props: any) {
  const { session } = useSessionUser();
  const { params } = props;
  const userId = params.id;
  const userQuery = useUser(userId);

  const pageTitle = `Profile ID ${userQuery.data?.username}`;

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (userQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title={pageTitle} />
      <FormUpdateUser userData={userQuery.data} userId={userId} />
    </div>
  );
}
