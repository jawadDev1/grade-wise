"use client";
import React, { useState } from "react";
import { SidebarMenuButton, SidebarMenuSubItem } from "../ui/sidebar";
import Typography from "../common/Typography";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import NextLink from "../common/NextLink";

const SidebarExpandItem = () => {
  const [teachingOpen, setTeachingOpen] = useState(false);

  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton
        onClick={() => setTeachingOpen((prev) => !prev)}
        className="w-full flex justify-between items-center"
      >
        <div className="flex gap-3">
          <Typography className="font-medium">Teaching</Typography>
        </div>
        {teachingOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </SidebarMenuButton>
      {teachingOpen && (
        <div className="ml-8 mt-2 space-y-2">
          <NextLink href="/teaching/assignments">
            <Typography className="text-sm hover:underline">
              Assignments
            </Typography>
          </NextLink>
          <NextLink href="/teaching/courses">
            <Typography className="text-sm hover:underline">Courses</Typography>
          </NextLink>
        </div>
      )}
    </SidebarMenuSubItem>
  );
};

export default SidebarExpandItem;
