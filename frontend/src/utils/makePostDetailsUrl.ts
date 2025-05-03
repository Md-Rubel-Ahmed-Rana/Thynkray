import { Post } from "@/modules/post/types";

const makePostDetailsUrl = (post: Post): string => {
  const content = Array.isArray(post?.content) ? post.content : [];
  const sectionTitles = content.map(
    (section) => `${section?.title ?? ""}${section?.description ?? ""}`
  );

  return `/post/${post?.slug}?title=${encodeURIComponent(
    post?.title ?? ""
  )}&desc=${encodeURIComponent(
    post?.description ?? ""
  )}&sections=${encodeURIComponent(sectionTitles.join("-"))}`;
};

export default makePostDetailsUrl;
