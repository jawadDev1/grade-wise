import { Connect } from "@/db/connection";
import { serializeMongooseDocument } from "@/lib/utils";
import { UserModel } from "@/models";
import mongoose from "mongoose";

export const registerUser = async (body) => {
  await Connect();
  const newUser = new UserModel(body);
  const result = await newUser.save();
  return serializeMongooseDocument(result);
};

export const getUser = async (match, aggregate = []) => {
  await Connect();
  if (match["_id"])
    match["_id"] = mongoose.Types.ObjectId.createFromHexString(match["_id"]);
  const result = await UserModel.aggregate([{ $match: match }, ...aggregate]);
  return result[0];
};

export const updateUser = async (match, body) => {
  await Connect();
  if (match["_id"])
    match["_id"] = mongoose.Types.ObjectId.createFromHexString(match["_id"]);
  const result = await UserModel.findOneAndUpdate(match, body, {
    new: true,
  });
  return serializeMongooseDocument(result);
};

export const getUsersCount = async () => {
  await Connect();
  const result = await UserModel.countDocuments();
  return result;
};
