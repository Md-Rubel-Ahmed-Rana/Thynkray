import React from "react";
import Banner from "./banner";
import MainContent from "./mainContent";
import LatestPosts from "./latestPosts";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";
import MiniAbout from "./about";
import ContactUs from "./contact";
import International from "./international";

const Home = () => {
  return (
    <main>
      <Banner />
      <MainContent />
      <LatestPosts />
      <International />
      <FeaturedAuthors />
      <DailyQuote />
      <MiniAbout />
      <ContactUs />
    </main>
  );
};

export default Home;
