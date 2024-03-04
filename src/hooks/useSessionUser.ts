import { useSession } from "next-auth/react";

const useSessionUser = () => {
  const { data: session, status }: any = useSession();
  const sessionId = session?.user.id;
  const sessionUsername = session?.user.username;
  const sessionFullName = session?.user.full_name;
  const sessionRole = session?.user.role;

  return {
    sessionId,
    sessionUsername,
    sessionFullName,
    sessionRole,
    status,
    session,
  };
};

export default useSessionUser;
