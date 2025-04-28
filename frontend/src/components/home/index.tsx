import React from "react";
import Banner from "./Banner";
import MainContent from "./mainContent";
import LatestPosts from "./latestPosts";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <LatestPosts />
      <FeaturedAuthors />
      <DailyQuote />
    </main>
  );
};

export default Home;
