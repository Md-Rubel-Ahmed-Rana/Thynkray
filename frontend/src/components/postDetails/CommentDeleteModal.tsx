import { Comment } from "@/modules/comment/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  comment: Comment;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CommentDeleteModal = ({ comment, open, setOpen }: Props) => {
  const handleDelete = () => {
    setOpen(false);
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
        <Button size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDeleteModal;
