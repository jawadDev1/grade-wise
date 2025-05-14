"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import BtnLink from "./BtnLink";

const ActionBtn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center w-full sm:w-max">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    );
  }

  return session?.user ? (
    <BtnLink
      text="Dashboard"
      href="/dashboard"
      className="flex justify-center w-full sm:w-max"
      variant="primary"
    />
  ) : (
    <BtnLink
      text="Get Started"
      href="/login"
      className="flex justify-center w-full sm:w-max"
      variant="primary"
    />
  );
};

export default ActionBtn;
