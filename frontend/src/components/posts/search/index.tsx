import SearchForm from "@/components/common/SearchForm";
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ShowSearchResult from "./ShowSearchResult";
import { cardData } from "@/constants/cardData";
import RelatedPosts from "@/components/sharedPosts/RelatedPosts";
import PopularPosts from "@/components/sharedPosts/PopularPosts";
import LatestPosts from "@/components/sharedPosts/LatestPosts";
import Categories from "@/components/common/Categories";
import InternationalPosts from "@/components/sharedPosts/InternationalPosts";
import { internationalNews } from "@/constants/international";

const PostsSearch = () => {
  const { query } = useRouter();
  const searchText = query.q as string;
  return (
    <Box component={"section"}>
      <SearchForm />
      {searchText && (
        <Typography variant="body1" mt={1} component={"h5"}>
          Search result for: <b>{`'${searchText}'`}</b>
        </Typography>
      )}

      <Typography variant="body1" mt={1} component={"h5"}>
        We found <b> {cardData?.length || 0} articles</b> for you
      </Typography>
      <Box sx={{ width: "100%", overflow: "auto" }} my={3}>
        <Categories />
      </Box>

      <Box mt={2} component={"div"}>
        <ShowSearchResult posts={cardData} />
      </Box>
      <Divider sx={{ margin: "20px 0px" }} />
      {/* related and popular posts  */}
      <Box mt={2} sx={{ display: "flex", gap: "2rem" }} component={"div"}>
        <Box sx={{ width: { xs: "100%", md: "70%" } }} component={"div"}>
          <RelatedPosts posts={cardData} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "30%" } }} component={"div"}>
          <PopularPosts posts={cardData} />
        </Box>
      </Box>

      <Divider sx={{ margin: "20px 0px" }} />

      {/* latest posts  */}
      <Box mt={5}>
        <LatestPosts />
      </Box>

      <Divider sx={{ margin: "20px 0px" }} />

      {/* international posts  */}
      <Box mt={5}>
        <Box my={3}>
          <Typography variant="h5" fontWeight={500} component={"h2"}>
            International posts
          </Typography>
          <Typography variant="body1" component={"p"}>
            Explore news out of the box. Gain knowledge world widely!
          </Typography>
        </Box>
        <InternationalPosts posts={internationalNews} />
      </Box>
    </Box>
  );
};

export default PostsSearch;
