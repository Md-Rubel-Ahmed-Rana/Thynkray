import { Box, Button, Typography } from "@mui/material";
import SearchForm from "../common/SearchForm";
import Categories from "../common/Categories";
import CommonPosts from "../sharedContent/CommonPosts";
import InternationalPosts from "../sharedContent/InternationalPosts";
import LatestPosts from "../sharedContent/LatestPosts";
import PopularPosts from "../sharedContent/PopularPosts";
import { useAllGetPosts } from "@/modules/post/hooks";
import CommonPostLoadingSkeleton from "../../skeletons/CommonPostLoadingSkeleton";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";

const Articles = () => {
  const { posts, isLoading } = useAllGetPosts();
  return (
    <Box>
      <SearchForm />
      <Categories />

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
                <Typography variant="subtitle2">
                  There is no articles found in server
                </Typography>
                <Typography variant="body2">
                  Either there was a problem in server or No articles create
                  yet.
                </Typography>
                <Link href={"/write/new"}>
                  <Button variant="contained" size="small">
                    Create Post
                  </Button>
                </Link>
              </Box>
            </NoDataFound>
          ) : (
            <CommonPosts posts={posts || []} />
          )}
        </>
      )}

      <Box my={4}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}
          mb={2}
        >
          International Highlights
        </Typography>
        <InternationalPosts />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexDirection: { xs: "column", md: "row" },
          }}
          my={4}
        >
          <Box sx={{ width: { xs: "100%", md: "70%" } }}>
            <LatestPosts />
          </Box>
          <Box mt={6} sx={{ width: { xs: "100%", md: "30%" } }}>
            <PopularPosts />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Articles;
