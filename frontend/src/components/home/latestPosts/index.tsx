import { Box } from "@mui/material";
import PostCard from "./PostCard";
import RightPopularPosts from "./RightPopularPosts";
import { cardData } from "@/constants/cardData";
import PaginationContainer from "./Pagination";

const LatestPosts = () => {
  return (
    <Box>
      <h2>Latest Posts</h2>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {cardData.map((post) => (
            <PostCard key={post?.id} post={post} />
          ))}
        </Box>
        <Box sx={{ width: { xs: "100%", md: "25%" } }}>
          <RightPopularPosts />
        </Box>
      </Box>
      <PaginationContainer />
    </Box>
  );
};

export default LatestPosts;
