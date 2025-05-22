import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { Chat } from "@/modules/chat/types";
import { useState } from "react";
import { updateChatTitle } from "@/modules/chat/api";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

type Props = {
  chat: Chat;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ChatTitleEditModal = ({ chat, open, setOpen }: Props) => {
  const { user } = useGetCurrentUser();
  const queryClient = useQueryClient();
  const [updatedTitle, setUpdatedTitle] = useState<string>(chat.title);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: () => updateChatTitle({ chatId: chat.id, title: updatedTitle }),
    onSuccess: () => {
      toast.success("Chat title updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["chats-messages", user?.id] });
      handleClose();
    },
    onError: () => {
      toast.error("Failed to update the chat title.");
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
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Edit Chat Title</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            autoFocus
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Enter new chat title"
            fullWidth
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          disabled={isLoading}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleDelete}
          autoFocus
          size="small"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatTitleEditModal;
