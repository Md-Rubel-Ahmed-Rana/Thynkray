import { Post } from "@/modules/post/types";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import PostDeleteModal from "./PostDeleteModal";

type Props = {
  post: Post;
};

const UserPostsActions = ({ post }: Props) => {
  const [shouldDelete, setShouldDelete] = useState(false);
  return (
    <>
      <Stack
        justifyContent={"space-between"}
        direction="row"
        spacing={1}
        mt={3}
      >
        <Button size="small" variant="outlined" color="primary">
          Edit
        </Button>
        <Button
          onClick={() => setShouldDelete(true)}
          size="small"
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </Stack>
      {shouldDelete && (
        <PostDeleteModal
          open={shouldDelete}
          setOpen={setShouldDelete}
          post={post}
        />
      )}
    </>
  );
};

export default UserPostsActions;
