"use client";

import { CardContent } from "@/components/dashboard/card-admin";
import PageTitle from "@/components/PageTitle";
import { AreaChartDashboardAdmin } from "@/components/dashboard/chart-admin";
import {
  useDashboardAdmin,
  useDashboardUser,
} from "./api/services/dashboard/queries";
import CardInfoAdmin from "@/components/dashboard/card-admin";
import useSessionUser from "@/hooks/useSessionUser";
import { AreaChartDashboardUser } from "@/components/dashboard/chart-user";
import InfoCurrentAdmin from "@/components/dashboard/info-current-admin";
import InfoCurrentUser from "@/components/dashboard/info-current-user";
import CardInfoUser from "@/components/dashboard/card-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { sessionFullName, sessionRole, sessionId, status, session } =
    useSessionUser();
  const dashboardAdminQuery = useDashboardAdmin();
  const dashboardUserQuery = useDashboardUser(sessionId);
  const router = useRouter();

  console.log("status?: ", status);
  console.log("sata session: ", session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }),
    [router, status];

  if (status === "loading" || session === "undefined") {
    return <Spinner />;
  }

  return (
    <div className="p-8 w-full">
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title={"Hai, " + sessionFullName} />
        {sessionRole === "admin" || sessionRole === "officer" ? (
          <CardInfoAdmin />
        ) : sessionRole === "user" ? (
          <CardInfoUser id={sessionId} />
        ) : (
          ""
        )}
        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-7">
          <CardContent className="col-span-4">
            <p className="p-4 font-semibold">Monthly borrow analytics</p>
            {sessionRole === "admin" || sessionRole === "officer" ? (
              <AreaChartDashboardAdmin
                chartData={dashboardAdminQuery.data}
                isLoading={dashboardAdminQuery.isLoading}
              />
            ) : sessionRole === "user" ? (
              <AreaChartDashboardUser
                chartData={dashboardUserQuery.data}
                isLoading={dashboardUserQuery.isLoading}
              />
            ) : (
              ""
            )}
          </CardContent>
          {sessionRole === "officer" || sessionRole === "admin" ? (
            <InfoCurrentAdmin />
          ) : sessionRole === "user" ? (
            <InfoCurrentUser id={sessionId} />
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
}
