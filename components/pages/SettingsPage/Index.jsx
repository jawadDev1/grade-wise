import { UpdateUserForm } from "@/components/modules/UpdateUserForm";
import React from "react";

const SettingsPage = ({ user }) => {
  return <UpdateUserForm user={user} />;
};

export default SettingsPage;
