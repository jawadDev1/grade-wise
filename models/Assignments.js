import { Schema, model, models } from "mongoose";

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: "users" },
    class_id: { type: Schema.Types.ObjectId, ref: "classes" },
    deadline: { type: Date, required: true },
    assignment: { type: String, required: true },
    criteria: {
      plagiarism: { type: Number, default: 2 },
      relevance: { type: Number, default: 2 },
      grammar: { type: Number, default: 2 },
      content_quality: { type: Number, default: 4 },
    },
    students: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export const AssignmentModel =
  models.Assignment || model("Assignment", AssignmentSchema);
