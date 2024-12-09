import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Nurse = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Nurse");
  }

  return (
    <div>
      <h1>Nurse Server Session</h1>
    </div>
  );
};

export default Nurse;
