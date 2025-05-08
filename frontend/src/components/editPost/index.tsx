import { useGetPostById } from "@/modules/post/hooks";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import EditPostForm from "./EditPostForm";

const EditPost = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { post, isLoading } = useGetPostById(id);

  return (
    <Box>
      <Typography>
        Edit post: {isLoading ? "Loading..." : post?.title}
      </Typography>
      {!isLoading && <EditPostForm post={post} />}
    </Box>
  );
};

export default EditPost;
