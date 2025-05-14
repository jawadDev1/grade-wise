import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    review: { type: String, required: true },
    assignment_id: { type: Schema.Types.ObjectId, ref: "Assignment" },
    class_id: { type: Schema.Types.ObjectId, ref: "Class" },
    marks: {
      plagiarism: { type: Number, default: 0 },
      relevance: { type: Number, default: 0 },
      grammar: { type: Number, default: 0 },
      content_quality: { type: Number, default: 0 },
    },
    student_id: { type: Schema.Types.ObjectId, ref: "users" },
    student_assignment: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export const ReviewModel = models.Review || model("Review", ReviewSchema);
