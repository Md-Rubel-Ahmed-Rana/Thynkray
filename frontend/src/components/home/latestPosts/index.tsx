import { Box } from "@mui/material";
import PostCard from "./PostCard";
import RightPopularPosts from "./RightPopularPosts";
import { cardData } from "@/constants/cardData";
import PaginationContainer from "./Pagination";

const LatestPosts = () => {
  return (
    <Box>
      <h2>Latest Posts</h2>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
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
            {cardData.slice(0, 5).map((post) => (
              <PostCard key={post?.id} post={post} />
            ))}
          </Box>
          <PaginationContainer />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <RightPopularPosts />
        </Box>
      </Box>
    </Box>
  );
};

export default LatestPosts;
