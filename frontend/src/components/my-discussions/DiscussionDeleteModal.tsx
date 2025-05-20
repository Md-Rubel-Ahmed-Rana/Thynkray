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
import { Discussion } from "@/modules/discussion/types";
import { deleteDiscussion } from "@/modules/discussion/api";

type Props = {
  discuss: Discussion;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const DiscussionDeleteModal = ({ discuss, open, setOpen }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => deleteDiscussion(discuss.id),
    onSuccess: () => {
      toast.success("Discussion deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete the discussion."
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
      <DialogTitle>Delete discussion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this discussion?
          <br />
          <strong>{discuss.title}</strong>
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

export default DiscussionDeleteModal;
