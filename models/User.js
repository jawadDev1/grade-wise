import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    username: { type: String, default: null, maxlength: 255 },
    email: { type: String, required: true, unique: true, maxlength: 255 },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    password: { type: String, maxlength: 255, default: null },
    age: { type: String, maxlength: 255, default: null, maxlength: 255 },
    verified: { type: Boolean, enum: [true, false], default: false },
    profile: { type: String, maxlength: 255, default: null },
    degree: { type: String, maxlength: 255, default: null },
    verification_type: {
      type: String,
      enum: ["google", "email"],
      default: "email",
    },
    role: {
      type: String,
      enum: ["STUDENT", "TEACHER"],
      default: "STUDENT",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export const UserModel = models.User || model("User", UserSchema);
