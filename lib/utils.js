import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { toast } from "sonner";
import mammoth from "mammoth";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

export function serializeMongooseDocument(doc) {
  return {
    ...doc?.toObject(),
    _id: doc._id ? doc._id.toString() : null,
  };
}

export const hashPassword = async (unHashed) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(unHashed, salt);
  return hashedPassword;
};

export const comparePassword = async (unHashed, hashed) => {
  const valid = await bcrypt.compare(unHashed, hashed);
  return valid;
};

export const notifySuccess = (message) =>
  toast.success(message, {
    cancel: {
      label: "Close",
    },
  });

export const notifyError = (message) =>
  toast.error(message, {
    cancel: {
      label: "Close",
    },
  });

export function formatDate(isoString) {
  if (!isoString) return "no date";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export const parseText = async (file) => {
  const assignmentResponse = await fetch(file);
  if (!assignmentResponse.ok) throw new Error("Failed to download file");

  const arrayBuffer = await assignmentResponse.arrayBuffer();

  const { value } = await mammoth.extractRawText({
    buffer: Buffer.from(arrayBuffer),
  });

  return value;
};

export const formatMarks = async (criteria, marks) => {
  if (!criteria || !marks) return "no found";

  const result = Object.keys(criteria).reduce(
    (acc, key) => {
      acc["total"] += criteria[key];
      acc["obtained"] += marks[key];
      return acc;
    },
    { total: 0, obtained: 0 }
  );

  return `${result.obtained}/${result.total}`;
};
