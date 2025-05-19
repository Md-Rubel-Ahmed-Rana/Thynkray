/* eslint-disable @typescript-eslint/no-explicit-any */
import { deletePost } from "@/modules/post/api";
import { Post } from "@/modules/post/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Props = {
  post: Post;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const PostDeleteModal = ({ post, open, setOpen }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => deletePost(post?.id),
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete the post."
      );
    },
  });

  const handleDelete = async () => {
    mutate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this post?
          <br />
          <strong>{post.title}</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDeleteModal;
