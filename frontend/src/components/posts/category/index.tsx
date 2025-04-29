import Categories from "@/components/common/Categories";
import SearchForm from "@/components/common/SearchForm";
import CommonPosts from "@/components/sharedPosts/CommonPosts";
import InternationalPosts from "@/components/sharedPosts/InternationalPosts";
import { cardData } from "@/constants/cardData";
import { internationalNews } from "@/constants/international";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const CategorizedPosts = () => {
  const { query } = useRouter();
  const category = query.category as string;

  const data = Array.from({ length: 10 });

  return (
    <Box>
      <Categories />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{ fontSize: { xs: "13px", md: "16px" } }}
          variant="body1"
          mt={1}
          component={"h5"}
        >
          We found <b> {data?.length || 0} articles</b> for{" "}
          <b> {`'${category}'`} </b>
          category
        </Typography>
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <SearchForm />
        </Box>
      </Box>
      <Box mt={3}>
        {category === "International" ? (
          <InternationalPosts posts={internationalNews} />
        ) : (
          <Box>
            <CommonPosts posts={cardData} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CategorizedPosts;
