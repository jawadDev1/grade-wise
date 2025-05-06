import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import AssignmentActions from "./AssignmentActions";
import NextLink from "../common/NextLink";

export function AssignmentCard({
  isStudent,
  id,
  title,
  description,
  deadline,
}) {
  const isExpired = new Date() > new Date(deadline);

  return (
    <Card className="w-full max-w-md">
      <NextLink
        className="w-full"
        href={`/assignments/assignment-detail/${id}`}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 text-gray-600">
            {description}
          </CardDescription>
          <Text as="p" className="mt-4 text-sm text-gray-500 font-medium">
            <span
              className={cn("font-[800] text-gray-900", {
                "text-red-600": isExpired,
              })}
            >
              Deadline:
            </span>{" "}
            {formatDate(deadline)}
          </Text>
        </CardContent>
      </NextLink>
      {!isStudent && (
        <AssignmentActions id={id} className={"justify-end my-2"} />
      )}
    </Card>
  );
}
