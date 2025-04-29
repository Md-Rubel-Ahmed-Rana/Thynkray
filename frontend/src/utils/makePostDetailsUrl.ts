import { Post } from "@/modules/post/types";

const makePostDetailsUrl = (post: Post): string => {
  const sectionTitles = post.content.map(
    (section) => section.title + section.description
  );
  return `/post/${post.slug}?title=${post.title}&desc=${
    post.description
  }&sections=${sectionTitles.join("-")}`;
};

export default makePostDetailsUrl;
