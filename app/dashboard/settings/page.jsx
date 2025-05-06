import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SettingsPage from "@/components/pages/SettingsPage/Index";
import { SERVICES } from "@/services";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
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
      <SettingsPage
        user={{
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
          name: user.name,
          gender: user.gender,
          age: user.age,
          profile: user.profile,
          degree: user.degree,
          verification_type: user.verification_type,
          role: user.role,
        }}
      />
    );
  } catch (error) {
    console.error("Session error:", error);
    return redirect("/login");
  }
};

export default page;
