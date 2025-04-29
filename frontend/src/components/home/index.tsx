import React from "react";
import Banner from "./banner";
import MainContent from "./mainContent";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";
import MiniAbout from "./about";
import ContactUs from "./contact";
import International from "./international";
import LatestPosts from "../sharedPosts/LatestPosts";
import { Box, Divider } from "@mui/material";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <Divider sx={{ margin: "20px 0px" }} />
      <Box my={4}>
        <LatestPosts />
      </Box>
      <Divider sx={{ margin: "20px 0px" }} />
      <International />
      <Divider sx={{ margin: "20px 0px" }} />
      <FeaturedAuthors />
      <Divider sx={{ margin: "20px 0px" }} />
      <DailyQuote />
      <Divider sx={{ margin: "20px 0px" }} />
      <MiniAbout />
      <Divider sx={{ margin: "20px 0px" }} />
      <ContactUs />
    </main>
  );
};

export default Home;
