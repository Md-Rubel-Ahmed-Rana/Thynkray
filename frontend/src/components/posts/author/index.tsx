import NoDataFound from "@/components/common/NoDataFound";
import CommonPosts from "@/components/sharedContent/CommonPosts";
import CommonPostLoadingSkeleton from "@/skeletons/CommonPostLoadingSkeleton";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPostsByAuthor } from "@/modules/post/api";
import { Post } from "@/modules/post/types";

const AuthorPosts = () => {
  const { query } = useRouter();
  const name = query.name as string;
  const authorId = query.authorId as string;
  const { data, isLoading } = useQuery({
    queryKey: ["posts", authorId],
    queryFn: getPostsByAuthor,
  });
  const posts = data as Post[];

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "24px" },
          }}
          variant="h5"
          fontWeight={600}
        >
          Articles by {name}
        </Typography>
        <Link href={"/authors"}>
          <Button size="small" type="button" variant="outlined">
            More Authors
          </Button>
        </Link>
      </Box>

      {isLoading ? (
        <CommonPostLoadingSkeleton />
      ) : (
        <>
          {posts.length <= 0 ? (
            <NoDataFound message="No Posts found!">
              <Typography>
                <b>{name}</b> has not created any posts yet. Start sharing your
                knowledge!
              </Typography>
              <Link href={"/write/new"}>
                <Button variant="contained" type="button" sx={{ mt: 1 }}>
                  Create Post
                </Button>
              </Link>
            </NoDataFound>
          ) : (
            <CommonPosts posts={posts || []} />
          )}
        </>
      )}
    </Box>
  );
};

export default AuthorPosts;
