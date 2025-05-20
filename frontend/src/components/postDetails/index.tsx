import { cardData } from "@/constants/cardData";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PostHeader from "./PostHeader";
import PostDescription from "./PostDescription";
import PostContent from "./PostContent";
import Comments from "./Comments";
import RelatedPosts from "../sharedContent/RelatedPosts";
import PopularPosts from "../sharedContent/PopularPosts";
import InternationalPosts from "../sharedContent/InternationalPosts";
import NoDataFound from "../common/NoDataFound";
import PostDetailsLoadingSkeleton from "@/skeletons/PostDetailsLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { handleFetchPostBySlug } from "@/modules/post/api";
import { Post } from "@/modules/post/types";
import { useIncrementPostViews } from "@/hooks/useIncrementPostViews";
import LatestDiscussions from "../sharedContent/LatestDiscussions";

const PostDetails = () => {
  const { query, back } = useRouter();
  const slug = query?.slug as string;
  const title = query?.title as string;
  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: handleFetchPostBySlug,
  });

  const post = data as Post;

  // increment post views
  useIncrementPostViews(post?.id);

  return (
    <>
      {isLoading ? (
        <PostDetailsLoadingSkeleton />
      ) : (
        <>
          {post?.id ? (
            <Box>
              <PostHeader post={post} />
              <PostDescription description={post?.description || ""} />
              <PostContent content={post?.content || []} />
              <Divider sx={{ margin: "20px 0px" }} />
              <Comments postId={post?.id} />
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
                  <RelatedPosts post={post} />
                </Box>
                <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
                  <PopularPosts posts={cardData} />
                </Box>
              </Box>
              <Divider sx={{ margin: "20px 0px" }} />
              <LatestDiscussions />
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
                <InternationalPosts />
              </Box>
            </Box>
          ) : (
            <NoDataFound message={"Post was not found!"}>
              <Typography variant="subtitle1">
                The post <b>{`'${title}'`}</b> was not found.
              </Typography>
              <Typography variant="body2">
                The post you are looking for might be removed from database or
                restricted
              </Typography>
              <Button
                sx={{ mt: 2 }}
                size="small"
                variant="outlined"
                onClick={() => back()}
              >
                Go Back
              </Button>
            </NoDataFound>
          )}
        </>
      )}
    </>
  );
};

export default PostDetails;
