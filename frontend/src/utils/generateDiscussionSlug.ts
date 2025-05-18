import { v4 as uuidv4 } from "uuid";

export const generateDiscussionSlug = (title: string): string => {
  const titleSLug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const uniqueId = uuidv4().split("-")[0];
  return `${titleSLug}-${uniqueId}`;
};
