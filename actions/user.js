"use server";
import { hashPassword } from "@/lib/utils";
import { SERVICES } from "@/services";

export const registerUser = async (user) => {
  const hashedPassword = await hashPassword(user.password);
  const usersCount = await SERVICES.AuthService.getUsersCount();
  const defaultRole = usersCount === 0 ? "TEACHER" : "STUDENT";
  const savedUser = await SERVICES.AuthService.registerUser({
    ...user,
    password: hashedPassword,
    role: defaultRole,
  });

  return {
    success: true,
    message: "User registered successfully",
    data: savedUser,
  };
};

export const updateUser = async (match, user) => {
  const updatedUser = await SERVICES.AuthService.updateUser(match, user);
  return {
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  };
};

export const UPLOAD_FILE = async (file) => {
  "use server"
  const result = await SERVICES.FileService.uploadFile(file);
  return {
    success: true,
    message: "File uploaded successfully",
    data: result,
  };
};
