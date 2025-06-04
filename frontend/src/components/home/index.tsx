import React from "react";
import Banner from "./banner";
import MainContent from "./mainContent";
import FeaturedAuthors from "./featuredAuthors";
import DailyQuote from "./quotes";
import ContactUs from "./contact";
import { Box, Divider } from "@mui/material";
import { InternationalPost, Post } from "@/modules/post/types";
import { Discussion } from "@/modules/discussion/types";
import { User } from "@/modules/user/types";
import { Quote } from "@/modules/quote/types";
import HomeDiscussions from "./discussions";
import LatestPosts from "./latestPosts";
import HomePopularPosts from "./popularPosts";
import GlobalNews from "./globalNews";

type HomeProps = {
  latestPosts: Post[];
  discussions: Discussion[];
  popularPosts: Post[];
  internationalPosts: InternationalPost[];
  featuredAuthors: User[];
  quotes: Quote[];
};

const Home = ({
  discussions,
  featuredAuthors,
  internationalPosts,
  latestPosts,
  popularPosts,
  quotes,
}: HomeProps) => {
  return (
    <main>
      <Banner />
      <MainContent posts={latestPosts} />
      <Divider sx={{ margin: "20px 0px" }} />
      <HomeDiscussions discussions={discussions} />
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
          <LatestPosts posts={latestPosts} />
        </Box>
        <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
          <HomePopularPosts posts={popularPosts} />
        </Box>
      </Box>

      <Divider sx={{ margin: "20px 0px" }} />
      <GlobalNews news={internationalPosts} />
      <Divider sx={{ margin: "20px 0px" }} />
      <FeaturedAuthors authors={featuredAuthors} />
      <Divider sx={{ margin: "20px 0px" }} />
      <DailyQuote quotes={quotes} />
      <Divider sx={{ margin: "20px 0px" }} />
      <ContactUs />
    </main>
  );
};

export default Home;
