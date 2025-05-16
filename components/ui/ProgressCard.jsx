"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Typography from "../common/Typography";
import { Text } from "@radix-ui/themes";
import NextLink from "../common/NextLink";
import Paragraph from "../shared/Paragraph";

export function ProgressCard({
  id,
  title,
  review,
  marks,
  className,
  ...props
}) {
  return (
    <div
      className="rounded-lg py-5 px-3 flex flex-col border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden"
      {...props}
    >
      <NextLink href={`/dashboard/progress/review/${id}`}>
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-heading-2 hover:text-blue-700">
            {title}
          </h2>

          <Paragraph>{review}</Paragraph>

          <Typography variant={"h6"}>Marks: {marks}</Typography>
        </div>
      </NextLink>
    </div>
  );
}
