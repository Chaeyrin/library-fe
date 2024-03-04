"use client";

import PageTitle from "@/components/PageTitle";
import CreateUserForm from "../components/user-create-form";
import useSessionUser from "@/hooks/useSessionUser";
import GoToLoginPage from "@/components/GoToLoginPage";
import ForbiddenAccess from "@/components/403";

export default function CreateUser() {
  const { session, sessionRole } = useSessionUser();

  // if (!session || !session.user) {
  //   return <GoToLoginPage />;
  // }

  if (sessionRole === "user") {
    return <ForbiddenAccess />;
  }

  return (
    <div className="flex flex-col gap-5 w-full p-8">
      <PageTitle title="Create User Information" />
      <CreateUserForm />
    </div>
  );
}
