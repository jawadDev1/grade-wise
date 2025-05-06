import {
  BookOpen,
  Home,
  ClipboardCheck,
  Users,
  Settings,
  GraduationCap,
  FileCheck,
  Trophy,
  BookOpenCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NextLink from "../common/NextLink";
import NextImage from "../common/NextImage";
import { cn, generateRandomString } from "@/lib/utils";
import Typography from "../common/Typography";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import SignOut from "../ui/SignOut";

// Define menu items for each role
const menuItems = {
  TEACHER: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      description: "Overview of your classes and recent activities",
    },
    {
      title: "Students",
      url: "/students",
      icon: Users,
      description: "View and manage your students",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      description: "Manage your account settings",
      className: "mt-auto",
    },
  ],
  STUDENT: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      description: "View your current assignments and grades",
    },
    {
      title: "Progress",
      url: "/progress",
      icon: Trophy,
      description: "Track your grades and progress",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      description: "Manage your account settings",
      className: "mt-auto",
    },
  ],
};

export async function AppSidebar() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const items = menuItems[role];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <NextLink href="/">
            <SidebarGroupLabel className="text-lg flex items-center gap-3 mb-3">
              <NextImage className="w-12 h-12" src="/icons/logo.svg" />
              {/* <div className="flex flex-col"> */}
                <Typography>GradeWise</Typography>
                {/* <Typography className="capitalize text-sm">{role}</Typography> */}
              {/* </div> */}
            </SidebarGroupLabel>
          </NextLink>
          <SidebarGroupContent className="grow">
            <SidebarMenu className="h-full">
              {items.map((item) => (
                <NextLink
                  href={item.url}
                  className={cn("flex flex-col gap-2", item.className)}
                  key={generateRandomString()}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className="flex  gap-3">
                        <item.icon className="h-5 w-5" />
                        <Typography className="font-medium">
                          {item.title}
                        </Typography>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </NextLink>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SignOut />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
