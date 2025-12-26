"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";


export default function Page() {
  const { data } = authClient.useSession();

  return (
    <div>
      {data?.user ? (
        <>
          <p>Logged in as {data.user.email}</p>
          <Button onClick={() => authClient.signOut()}>Sign out</Button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  )
}
