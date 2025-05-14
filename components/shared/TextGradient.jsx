import { cn } from "@/lib/utils";
import React from "react";

const TextGradient = ({ children, className }) => {
  return (
    <span
      className={cn(
        "text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600",
        className
      )}
    >
      {children}
    </span>
  );
};

export default TextGradient;
