import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AppSidebar } from "@/components/modules/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SERVICES } from "@/services";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";


const Index = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  try {
    const user = await SERVICES.AuthService.getUser({ _id: session.user.id });
    if (!user) {
      return redirect("/login");
    }

    return (
      <SidebarProvider>
        
        <AppSidebar />
        <main className="relative w-full h-screen p-3">
          <SidebarTrigger asChild />
          {children}
        </main>
      </SidebarProvider>
    );
  } catch (error) {
    console.error("Index session error:", error);
    return redirect("/login");
  }
};

export default Index;
