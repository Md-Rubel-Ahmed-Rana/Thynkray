import SearchForm from "@/components/common/SearchForm";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import ShowSearchResult from "./ShowSearchResult";
import { cardData } from "@/constants/cardData";
import RelatedPosts from "@/components/sharedContent/RelatedPosts";
import PopularPosts from "@/components/sharedContent/PopularPosts";
import LatestPosts from "@/components/sharedContent/LatestPosts";
import Categories from "@/components/common/Categories";
import InternationalPosts from "@/components/sharedContent/InternationalPosts";
import { internationalNews } from "@/constants/international";
import { useGetPostsBySearched } from "@/modules/post/hooks";
import CommonPostLoadingSkeleton from "@/components/loadingSkeletons/CommonPostLoadingSkeleton";
import NoDataFound from "@/components/common/NoDataFound";
import Link from "next/link";

const PostsSearch = () => {
  const { query } = useRouter();
  const searchText = query?.q as string;
  const { isLoading, posts } = useGetPostsBySearched(searchText);
  return (
    <Box component={"section"}>
      <SearchForm />
      {searchText && (
        <Typography
          sx={{ fontSize: { xs: "14px", md: "18px" } }}
          variant="body1"
          mt={1}
          component={"h5"}
        >
          Search result for: <b>{`'${searchText}'`}</b>
        </Typography>
      )}

      <Typography
        sx={{ fontSize: { xs: "13px", md: "16px" } }}
        variant="body1"
        mt={1}
        component={"h5"}
      >
        We found <b> {posts?.length || 0} articles</b> for you
      </Typography>
      <Box sx={{ width: "100%", overflow: "auto" }} my={3}>
        <Categories />
      </Box>

      <Box mt={2} component={"div"}>
        {isLoading ? (
          <CommonPostLoadingSkeleton />
        ) : (
          <>
            {posts?.length <= 0 ? (
              <NoDataFound message="No Articles Found!">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography>
                    We did not found any posts for you by the text of{" "}
                    <b>{`"${searchText}"`}</b>
                  </Typography>
                  <Typography>
                    Your search criterias were not matched to your available
                    content.
                  </Typography>
                  <Typography>
                    We appreciate your patient. Please try with different
                    keywords
                  </Typography>
                  <b>OR</b>
                  <Link href={"/write/new"}>
                    <Button variant="contained" size="small">
                      Create Post
                    </Button>
                  </Link>
                </Box>
              </NoDataFound>
            ) : (
              <ShowSearchResult posts={posts} />
            )}
          </>
        )}
      </Box>
      <Divider sx={{ margin: "20px 0px" }} />
      {/* related and popular posts  */}
      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
        }}
        component={"div"}
      >
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
