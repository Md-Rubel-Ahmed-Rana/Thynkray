import { Box, Typography } from "@mui/material";
import LatestPostCard from "./LatestPostCard";
import LatestPostLoadingSkeleton from "../../skeletons/LatestPostLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getLatestPosts } from "@/modules/post/api";
import { Post } from "@/modules/post/types";

const LatestPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", "1000"],
    queryFn: getLatestPosts,
  });
  const posts = data as Post[];
  return (
    <Box>
      <Typography mb={2} variant="h5" component={"h2"}>
        Latest Posts
      </Typography>
      {isLoading ? (
        <LatestPostLoadingSkeleton />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {posts.map((post) => (
                <LatestPostCard key={post?.id} post={post} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LatestPosts;
