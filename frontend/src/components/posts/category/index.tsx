import Categories from "@/components/common/Categories";
import NoDataFound from "@/components/common/NoDataFound";
import SearchForm from "@/components/common/SearchForm";
import CommonPostLoadingSkeleton from "@/skeletons/CommonPostLoadingSkeleton";
import CommonPosts from "@/components/sharedContent/CommonPosts";
import InternationalPosts from "@/components/sharedContent/InternationalPosts";
import LatestPosts from "@/components/sharedContent/LatestPosts";
import { useGetPostsByCategory } from "@/modules/post/hooks";
import { Box, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const CategorizedPosts = () => {
  const { query } = useRouter();
  const category = query.category as string;
  const { isLoading, posts } = useGetPostsByCategory(category);

  return (
    <Box>
      <Categories />

      {category === "International" ? (
        <Box sx={{ width: "100%" }}>
          <SearchForm />
        </Box>
      ) : (
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
            We found <b> {posts?.length || 0} articles</b> for{" "}
            <b> {`'${category}'`} </b>
            category
          </Typography>
          <Box sx={{ width: { xs: "100%", md: "30%" } }}>
            <SearchForm />
          </Box>
        </Box>
      )}

      <Box mt={3}>
        {category === "International" ? (
          <InternationalPosts />
        ) : (
          <Box>
            {isLoading ? (
              <CommonPostLoadingSkeleton />
            ) : (
              <>
                {posts?.length <= 0 ? (
                  <NoDataFound message="No articles found!">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography>
                        Articles you are looking for the category of{" "}
                        <b>{`"${category}"`}</b> were not available.
                      </Typography>
                      <Typography>
                        If you are interested to create posts on the category of{" "}
                        <b>{`"${category}"`}</b>, Please click below button.
                      </Typography>
                      <Link href={"/write/new"}>
                        <Button variant="contained" size="small">
                          Create Post
                        </Button>
                      </Link>
                    </Box>
                  </NoDataFound>
                ) : (
                  <CommonPosts posts={posts} />
                )}
              </>
            )}
          </Box>
        )}
      </Box>
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
            <InternationalPosts />
          </Box>
        </>
      )}
    </Box>
  );
};

export default CategorizedPosts;
