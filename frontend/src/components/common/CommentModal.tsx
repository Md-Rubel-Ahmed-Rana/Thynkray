import { useGetLoggedInUser } from "@/modules/user/hooks";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  postId: string;
};

const MAX_CHAR = 200;

const CommentModal = ({ open, setOpen, postId }: Props) => {
  const { user } = useGetLoggedInUser();
  const [content, setContent] = useState("");

  const handleUpdateUserInfo = async () => {
    const data = {
      postId,
      userId: user?.id,
      content,
    };
    console.log(data);
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
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
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
          >
            Cancel
          </Button>
          <Button
            disabled={!content}
            variant="contained"
            size="small"
            onClick={handleUpdateUserInfo}
          >
            Add comment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
