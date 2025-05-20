/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { addComment } from "@/modules/comment/api";
import { NewComment } from "@/modules/comment/types";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  postId: string;
};

const MAX_CHAR = 200;

const CommentModal = ({ open, setOpen, postId }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useGetCurrentUser();
  const [content, setContent] = useState("");

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: NewComment) => addComment(data),
    onSuccess: () => {
      toast.success("Comment added successfully");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add the comment."
      );
    },
  });

  const handleUpdateUserInfo = async () => {
    mutate({
      postId,
      userId: user?.id as string,
      content,
    });
  };

  return (
    <Modal
      aria-labelledby="comment-modal-title"
      aria-describedby="comment-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          border: "1px solid gray",
          p: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography id="comment-modal-title" variant="h6" component="h2">
          Leave a comment
        </Typography>
        <Typography
          id="comment-modal-description"
          variant="body2"
          color="text.secondary"
        >
          Share your thoughts or feedback. Your insights matter!
        </Typography>

        <TextField
          label="Comment"
          multiline
          rows={2}
          fullWidth
          value={content}
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHAR) {
              setContent(e.target.value);
            }
          }}
          helperText={`${content.length}/${MAX_CHAR} characters`}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="small"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            disabled={!content || isLoading}
            variant="contained"
            size="small"
            onClick={handleUpdateUserInfo}
          >
            {isLoading ? "Posting..." : "Add comment"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
