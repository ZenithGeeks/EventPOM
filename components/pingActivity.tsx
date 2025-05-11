import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function PingUserActivity() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const interval = setInterval(() => {
      fetch(`/api/users/${userId}/ping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    }, 600000);

    return () => clearInterval(interval);
  }, [session?.user?.id]);

  return null;
}
