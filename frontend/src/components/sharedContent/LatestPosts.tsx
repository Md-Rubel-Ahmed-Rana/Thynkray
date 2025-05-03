import { Box, Skeleton, Typography } from "@mui/material";
import LatestPostCard from "./LatestPostCard";
import { useGetLatestPosts } from "@/modules/post/hooks";

const LatestPosts = () => {
  const { isLoading, posts } = useGetLatestPosts();
  return (
    <Box>
      <Typography mb={2} variant="h5" component={"h2"}>
        Latest Posts
      </Typography>
      {isLoading ? (
        <Skeleton width={"100%"} height={150} />
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
