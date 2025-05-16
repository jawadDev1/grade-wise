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
import Paragraph from "../shared/Paragraph";

export function AssignmentCard({
  isStudent,
  id,
  title,
  description,
  deadline,
}) {
  const isExpired = new Date() > new Date(deadline);

  return (
    <div className="rounded-xl px-2 py-3 flex flex-col border border-box-border bg-box-bg shadow-lg shadow-box-shadow relative overflow-hidden">
      <NextLink
        className="w-full"
        href={`/dashboard/assignments/assignment-detail/${id}`}
      >
        <h2 className="text-lg md:text-xl font-semibold text-heading-2 hover:text-blue-700">
          {title}
        </h2>

        <Paragraph>{description}</Paragraph>
        <Text as="p" className="mt-4 text-sm text-gray-500 font-medium">
          <span
            className={cn("font-[800] text-gray-900 dark:text-gray-300", {
              "text-red-600": isExpired,
            })}
          >
            Deadline:
          </span>{" "}
          {formatDate(deadline)}
        </Text>
      </NextLink>
      {/* {!isStudent && (
        <AssignmentActions id={id} className={"justify-end my-2"} />
      )} */}
    </div>
  );
}
