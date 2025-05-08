import { Post } from "@/modules/post/types";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import PostDeleteModal from "./PostDeleteModal";
import Link from "next/link";

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
        <Link
          href={`/write/edit/${post?.id}?title=${post?.title}&description=${post?.description}`}
        >
          <Button size="small" variant="outlined" color="primary">
            Edit
          </Button>
        </Link>
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
