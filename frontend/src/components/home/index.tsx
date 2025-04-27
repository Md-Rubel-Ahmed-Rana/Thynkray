import React from "react";
import Banner from "./Banner";
import LatestPosts from "./LatestPosts";
import MainContent from "./mainContent";

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
