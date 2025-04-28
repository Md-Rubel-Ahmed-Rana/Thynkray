import React from "react";
import Banner from "./Banner";
import MainContent from "./mainContent";
import LatestPosts from "./latestPosts";
import FeaturedAuthors from "./featuredAuthors";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <LatestPosts />
      <FeaturedAuthors />
    </main>
  );
};

export default Home;
