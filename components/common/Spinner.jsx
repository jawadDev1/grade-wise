import { cn } from "@/lib/utils";
import React from "react";

const Spinner = ({ className, ...props }) => {
  return (
    <div
      className={cn("flex justify-center items-center h-8 w-8 p-1", className)}
      {...props}
    >
      <div className="animate-spin rounded-full h-full w-full border-2 border-gray-200 border-t-gray-600"></div>
    </div>
  );
};

export default Spinner;
