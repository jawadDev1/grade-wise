import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const NextLink = ({ children, className, ...props }) => {
  return (
    <Link
      className={cn("no-underline inline-block text-foreground", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NextLink;
