'use client';
import React from "react";
import Typography from "../common/Typography";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <div className="flex  gap-3" onClick={() => signOut()}>
      <LogOut className="h-5 w-5" />
      <Typography className="font-medium">Logout</Typography>
    </div>
  );
};

export default SignOut;
