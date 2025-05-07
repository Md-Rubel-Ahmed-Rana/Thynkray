import { Post } from "@/modules/post/types";
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
  post: Post;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const PostDeleteModal = ({ post, open, setOpen }: Props) => {
  const handleDelete = async () => {
    toast.success("Post deleted successfully!");
    handleClose();
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

export default PostDeleteModal;
