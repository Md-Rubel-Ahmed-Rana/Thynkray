/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import { Comment } from "@/modules/comment/types";
import { deleteComment } from "@/modules/comment/api";

type Props = {
  comment: Comment;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CommentDeleteModal = ({ comment, open, setOpen }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete the comment."
      );
    },
  });

  const handleDelete = () => {
    mutate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this comment?
          <br />
          <strong>{comment.content}</strong>
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
          disabled={isLoading}
          variant="contained"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDeleteModal;
