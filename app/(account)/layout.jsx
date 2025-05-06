import React from "react";
import { unstable_noStore as noStore } from "next/cache";

noStore();
const Index = ({ children }) => {
  return <main className="relative min-h-screen">{children}</main>;
};

export default Index;
