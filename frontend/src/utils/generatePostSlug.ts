import { CreateNewPost, UpdatePost } from "@/modules/post/types";
import { v4 as uuidv4 } from "uuid";

export const generateSlugPart = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const generatePostSlug = (
  newPost: CreateNewPost | UpdatePost
): string => {
  const postTitleSlug = generateSlugPart(newPost.title);
  const sectionTitlesSlug = newPost.content
    .map((section) => generateSlugPart(section.title))
    .join("-");

  const uniqueId = uuidv4().split("-")[0];
  return `${postTitleSlug}-${sectionTitlesSlug}-${uniqueId}`;
};
