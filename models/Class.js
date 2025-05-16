import { Schema, model, models } from "mongoose";

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cover_img: {
      type: String,
      default: '/classes/bg-1.jpg'
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    assignments: [{ type: Schema.Types.ObjectId, ref: "assignments" }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export const ClassModel = models.Class || model("Class", classSchema);
