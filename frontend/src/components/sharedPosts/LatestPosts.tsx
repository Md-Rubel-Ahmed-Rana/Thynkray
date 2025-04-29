import { Box, Typography } from "@mui/material";
import { cardData } from "@/constants/cardData";
import LatestPostCard from "./LatestPostCard";

const LatestPosts = () => {
  return (
    <Box>
      <Typography mb={2} variant="h5" component={"h2"}>
        Latest Posts
      </Typography>
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
            {cardData.slice(0, 5).map((post) => (
              <LatestPostCard key={post?.id} post={post} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LatestPosts;
