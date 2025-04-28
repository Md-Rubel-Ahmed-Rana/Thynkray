import React from "react";
import Banner from "./Banner";
import MainContent from "./mainContent";
import LatestPosts from "./latestPosts";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";
import MiniAbout from "./about";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <LatestPosts />
      <FeaturedAuthors />
      <DailyQuote />
      <MiniAbout />
    </main>
  );
};

export default Home;
