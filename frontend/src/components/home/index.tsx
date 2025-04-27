import React from "react";
import Banner from "./Banner";
import MainContent from "./mainContent";
import LatestPosts from "./latestPosts";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <LatestPosts />
    </main>
  );
};

export default Home;
