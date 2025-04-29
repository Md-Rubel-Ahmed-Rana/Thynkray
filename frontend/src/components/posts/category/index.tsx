import Categories from "@/components/common/Categories";
import SearchForm from "@/components/common/SearchForm";
import CommonPosts from "@/components/sharedContent/CommonPosts";
import InternationalPosts from "@/components/sharedContent/InternationalPosts";
import LatestPosts from "@/components/sharedContent/LatestPosts";
import RelatedPosts from "@/components/sharedContent/RelatedPosts";
import { cardData } from "@/constants/cardData";
import { internationalNews } from "@/constants/international";
import { Box, Divider, Typography } from "@mui/material";
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
        flexDirection={{ xs: "column-reverse", md: "row" }}
        alignItems={"center"}
      >
        <Typography
          sx={{ fontSize: { xs: "14px", md: "16px" } }}
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
      <Divider sx={{ margin: "20px 0px" }} />
      <RelatedPosts posts={cardData} />
      <Divider sx={{ margin: "20px 0px" }} />
      <Box my={3}>
        <LatestPosts />
      </Box>

      {category !== "International" && (
        <>
          <Divider sx={{ margin: "20px 0px" }} />
          <Box my={5}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
              mb={2}
            >
              International Highlights
            </Typography>
            <InternationalPosts posts={internationalNews} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CategorizedPosts;
