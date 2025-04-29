import { cardData } from "@/constants/cardData";
import { Post } from "@/modules/post/types";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PostHeader from "./PostHeader";
import PostDescription from "./PostDescription";
import PostContent from "./PostContent";

const PostDetails = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  const post = cardData.find((post) => post?.slug === slug) as Post;
  return (
    <Box>
      <PostHeader post={post} />
      <PostDescription description={post?.description || ""} />
      <PostContent content={post?.content || []} />
    </Box>
  );
};

export default PostDetails;
