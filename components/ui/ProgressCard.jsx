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

export function ProgressCard({
  id,
  title,
  review,
  marks,
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <NextLink href={`/dashboard/progress/review/${id}`}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>
              <Text className="line-clamp-3" as="p">
                {review}
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Typography variant={"h6"}>Marks: {marks}</Typography>
          </CardContent>
        </Card>
      </NextLink>
    </div>
  );
}
