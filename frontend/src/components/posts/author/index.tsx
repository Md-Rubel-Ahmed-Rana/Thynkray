import NoDataFound from "@/components/common/NoDataFound";
import CommonPosts from "@/components/sharedContent/CommonPosts";
import CommonPostLoadingSkeleton from "@/loadingSkeletons/CommonPostLoadingSkeleton";
import { useGetPostsByAuthor } from "@/modules/post/hooks";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthorPosts = () => {
  const { query } = useRouter();
  const name = query.name as string;
  const authorId = query.authorId as string;
  const { isLoading, posts } = useGetPostsByAuthor(authorId);
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5" fontWeight={600}>
          Articles by {name}
        </Typography>
        <Link href={"/authors"}>
          <Button type="button" variant="outlined">
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
                You have not created any posts yet. Start sharing your
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
