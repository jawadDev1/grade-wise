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

import SignOut from "../ui/SignOut";
import TextGradient from "../shared/TextGradient";

// Define menu items for each role
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
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
];

export async function AppSidebar() {
  const items = menuItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="h-full">
          <NextLink href="/">
            <SidebarGroupLabel className="text-lg flex items-center gap-3 mb-3">
              <NextImage className="w-12 h-12" src="/icons/logo.svg" />
              <TextGradient className={"text-xl font-bold"}>
                GradeWise
              </TextGradient>
            </SidebarGroupLabel>
          </NextLink>
          <SidebarGroupContent className="grow">
            <SidebarMenu className="h-full">
              <NextLink
                href={"/dashboard"}
                className={cn("flex flex-col gap-2 my-4")}
                key={generateRandomString()}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex  gap-3">
                      <Home className="h-5 w-5" />
                      <Typography className="font-medium">Dashboard</Typography>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </NextLink>
              <NextLink
                href={"/dashboard/progress"}
                className={cn("flex flex-col gap-2")}
                key={generateRandomString()}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex  gap-3">
                      <Trophy className="h-5 w-5" />
                      <Typography className="font-medium">Progress</Typography>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </NextLink>

              <NextLink
                href={"/dashboard/settings"}
                className={cn("flex flex-col gap-2 mt-auto")}
                key={generateRandomString()}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex  gap-3 ">
                      <Settings className="h-5 w-5" />
                      <Typography className="font-medium">Settings</Typography>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </NextLink>

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
