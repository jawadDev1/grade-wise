"use client";
import { LoginForm } from "@/components/modules/LoginForm";
import { SignupForm } from "@/components/modules/SignupForm";
import React, { useState } from "react";

const AccountPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const handleFormChange = (formType) => {
    setCurrentForm(formType);
  };

  return (
    <>
      {currentForm == "login" ? (
        <LoginForm
          className={
            "max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          }
          handleFormChange={handleFormChange}
        />
      ) : (
        <SignupForm
          className={
            "max-w-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          }
          handleFormChange={handleFormChange}
        />
      )}
    </>
  );
};

export default AccountPage;
