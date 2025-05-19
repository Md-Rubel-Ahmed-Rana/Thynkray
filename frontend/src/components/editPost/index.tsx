import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import EditPostForm from "./EditPostForm";
import NoDataFound from "../common/NoDataFound";
import EditPostLoadingSkeleton from "@/skeletons/EditPostLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { handleFetchPostId } from "@/modules/post/api";
import { Post } from "@/modules/post/types";

const EditPost = () => {
  const { query, back } = useRouter();
  const id = query?.id as string;
  const title = query?.title as string;
  const { data, isLoading } = useQuery({
    queryKey: ["getAllDiscussions", id],
    queryFn: handleFetchPostId,
  });

  const post = data as Post;

  return (
    <Box>
      {isLoading ? (
        <EditPostLoadingSkeleton />
      ) : (
        <>
          {post?.id ? (
            <EditPostForm post={post} />
          ) : (
            <NoDataFound message="Post was not found">
              <Typography variant="subtitle1">
                The post <b> {title} </b> was not found
              </Typography>
              <Typography variant="body1">
                Your post either removed or something went wrong on server!
              </Typography>
              <Button sx={{ mt: 2 }} variant="contained" onClick={() => back()}>
                Back to Dashboard
              </Button>
            </NoDataFound>
          )}
        </>
      )}
    </Box>
  );
};

export default EditPost;
