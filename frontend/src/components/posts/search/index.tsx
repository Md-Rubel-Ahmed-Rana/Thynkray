import SearchForm from "@/components/common/SearchForm";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ShowSearchResult from "./ShowSearchResult";
import { cardData } from "@/constants/cardData";

const PostsSearch = () => {
  const { query } = useRouter();
  const searchText = query.q as string;
  return (
    <Box component={"section"}>
      <SearchForm />
      <Typography variant="body1" mt={1} component={"h5"}>
        Search result for: <b>{`'${searchText}'`}</b>
      </Typography>
      <Typography variant="body1" mt={1} component={"h5"}>
        We found <b> {cardData?.length || 0} articles</b> for you
      </Typography>
      <Box mt={2} component={"div"}>
        <ShowSearchResult posts={cardData} />
      </Box>
    </Box>
  );
};

export default PostsSearch;
