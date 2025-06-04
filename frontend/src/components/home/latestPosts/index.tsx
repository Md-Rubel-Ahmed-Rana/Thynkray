import { Box, Typography } from "@mui/material";
import React from "react";
import LatestPostCard from "./LatestPostCard";
import { Post } from "@/modules/post/types";

type Props = {
  posts: Post[];
};

const LatestPosts = ({ posts = [] }: Props) => {
  return (
    <Box width={"100%"}>
      <Typography mb={2} variant="h5" component={"h2"}>
        Latest Posts
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
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
    </Box>
  );
};

export default LatestPosts;
