import { Box, Typography } from "@mui/material";
import React from "react";
import SearchForm from "../common/SearchForm";
import Categories from "../common/Categories";
import CommonPosts from "../sharedPosts/CommonPosts";
import { cardData } from "@/constants/cardData";
import InternationalPosts from "../sharedPosts/InternationalPosts";
import { internationalNews } from "@/constants/international";
import LatestPosts from "../sharedPosts/LatestPosts";
import PopularPosts from "../sharedPosts/PopularPosts";

const Articles = () => {
  return (
    <Box>
      <SearchForm />
      <Categories />
      <CommonPosts posts={cardData} />
      <Box my={4}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          mb={2}
        >
          International Highlights
        </Typography>
        <InternationalPosts posts={internationalNews} />
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
            <LatestPosts />
          </Box>
          <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
            <PopularPosts posts={cardData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Articles;
