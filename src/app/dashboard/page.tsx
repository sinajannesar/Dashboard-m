// در route مثل pages/profile.tsx یا API route
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function UsersList() {
  const session = await getServerSession(authOptions);

  return <div>Session: {JSON.stringify(session!)}</div>;
}