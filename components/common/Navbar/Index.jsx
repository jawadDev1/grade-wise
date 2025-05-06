"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <nav className="bg-white shadow-md sticky  top-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">GradeWise</span>
        <div className="space-x-4">
          <a
            href="#features"
            className="text-gray-700 hover:text-primary transition"
          >
            Features
          </a>
          <a
            href="#why"
            className="text-gray-700 hover:text-primary transition"
          >
            Why Us
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-primary transition"
          >
            Contact
          </a>
          {data?.user ? (
            <Link href={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
