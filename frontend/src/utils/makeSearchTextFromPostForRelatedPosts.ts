import { Post } from "@/modules/post/types";

const makeSearchTextFromPostForRelatedPosts = (post: Post): string => {
  const contentText = post.content.map((item) => item.title).join(" ");

  const tagsText = post.tags.join(" ");

  return `${post.title} ${post.description} ${tagsText} ${post.category} ${contentText}`.toLowerCase();
};

export default makeSearchTextFromPostForRelatedPosts;
