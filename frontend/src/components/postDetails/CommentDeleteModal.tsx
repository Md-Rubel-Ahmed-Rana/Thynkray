import { useDeleteComment } from "@/modules/comment/hooks";
import { Comment } from "@/modules/comment/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

type Props = {
  comment: Comment;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CommentDeleteModal = ({ comment, open, setOpen }: Props) => {
  const { deleteComment, isLoading } = useDeleteComment();
  const handleDelete = async () => {
    await deleteComment({
      postId: comment?.post?.id as string,
      commentId: comment?.id,
    });

    toast.success("Comment deleted successfully!");
    handleClose();
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
