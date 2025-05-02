import { cardData } from "@/constants/cardData";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PostHeader from "./PostHeader";
import PostDescription from "./PostDescription";
import PostContent from "./PostContent";
import Comments from "./Comments";
import RelatedPosts from "../sharedContent/RelatedPosts";
import PopularPosts from "../sharedContent/PopularPosts";
import InternationalPosts from "../sharedContent/InternationalPosts";
import { internationalNews } from "@/constants/international";
import { useGetPostById } from "@/modules/post/hooks";

const PostDetails = () => {
  const { query } = useRouter();
  // const slug = query?.slug as string;
  const id = query?.id as string;
  const { post } = useGetPostById(id);

  console.log({ post });

  // const post = cardData.find((post) => post?.slug === slug) as Post;

  return (
    <Box>
      <PostHeader post={post} />
      <PostDescription description={post?.description || ""} />
      <PostContent content={post?.content || []} />
      <Divider sx={{ margin: "20px 0px" }} />
      <Comments />
      <Divider sx={{ margin: "20px 0px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
        my={4}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <RelatedPosts posts={cardData} />
        </Box>
        <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
          <PopularPosts posts={cardData} />
        </Box>
      </Box>
      <Divider sx={{ margin: "20px 0px" }} />
      <Box>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          mb={2}
        >
          International News
        </Typography>
        <InternationalPosts posts={internationalNews} />
      </Box>
    </Box>
  );
};

export default PostDetails;
