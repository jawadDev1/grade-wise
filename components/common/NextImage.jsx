import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const NextImage = ({ className, ...props }) => {
  return (
    <Image
      width={100}
      height={100}
      alt="Supposed to be an image"
      className={cn("inline-block", className)}
      {...props}
    />
  );
};

export default NextImage;
