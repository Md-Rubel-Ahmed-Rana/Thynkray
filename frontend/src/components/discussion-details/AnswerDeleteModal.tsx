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
import { deleteAnswer } from "@/modules/answer/api";

type Props = {
  id: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AnswerDeleteModal = ({ id, open, setOpen }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => deleteAnswer(id),
    onSuccess: () => {
      toast.success("Answer deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["answers", "answers", "discussions", "discussion"],
      });
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete the answer."
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
          Are you sure you want to delete this answer?
          <br />
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

export default AnswerDeleteModal;
