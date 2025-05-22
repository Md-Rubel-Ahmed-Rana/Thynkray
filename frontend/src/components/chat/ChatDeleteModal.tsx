import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Chat } from "@/modules/chat/types";
import { deleteChat } from "@/modules/chat/api";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

type Props = {
  chat: Chat;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ChatDeleteModal = ({ chat, open, setOpen }: Props) => {
  const { user } = useGetCurrentUser();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => deleteChat(chat.id),
    onSuccess: () => {
      toast.success("Chat deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["chats-messages", user?.id] });
      handleClose();
    },
    onError: () => {
      toast.error("Failed to delete the chat.");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography>
            Are you sure, you want to delete that <b>{chat.title} chat?</b>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          disabled={isLoading}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDeleteModal;
