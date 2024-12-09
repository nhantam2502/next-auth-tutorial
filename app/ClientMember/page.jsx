"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Member = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; 
    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/ClientMember");
    } else {
      setLoading(false);
    }
  }, [status, router]);

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(">>> session in member client session: ", session)

  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
