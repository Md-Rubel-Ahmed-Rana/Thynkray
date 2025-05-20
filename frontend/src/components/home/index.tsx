import React from "react";
import Banner from "./banner";
import MainContent from "./mainContent";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";
import ContactUs from "./contact";
import International from "./international";
import LatestPosts from "../sharedContent/LatestPosts";
import { Box, Divider } from "@mui/material";
import PopularPosts from "../sharedContent/PopularPosts";
import LatestDiscussions from "../sharedContent/LatestDiscussions";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <Divider sx={{ margin: "20px 0px" }} />
      <LatestDiscussions />
      <Divider sx={{ margin: "20px 0px" }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
        my={4}
      >
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <LatestPosts />
        </Box>
        <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
          <PopularPosts />
        </Box>
      </Box>

      <Divider sx={{ margin: "20px 0px" }} />
      <International />
      <Divider sx={{ margin: "20px 0px" }} />
      <FeaturedAuthors />
      <Divider sx={{ margin: "20px 0px" }} />
      <DailyQuote />
      <Divider sx={{ margin: "20px 0px" }} />
      <ContactUs />
    </main>
  );
};

export default Home;
