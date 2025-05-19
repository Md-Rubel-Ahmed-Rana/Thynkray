/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateComment } from "@/modules/comment/api";
import { Comment } from "@/modules/comment/types";
import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  comment: Comment;
  setShouldEdit: (value: boolean) => void;
};

const CommentEditForm = ({ comment, setShouldEdit }: Props) => {
  const [updatedContent, setUpdatedContent] = useState(comment?.content);
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["update-comment", comment.id],
    mutationFn: () =>
      updateComment({ commentId: comment.id, content: updatedContent }),
    onSuccess: () => {
      toast.success("Comment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setShouldEdit(false);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update the comment."
      );
    },
  });

  const handleUpdateComment = async () => {
    mutate();
  };

  return (
    <Box mt={2} width={"100%"}>
      <TextField
        name="content"
        label="Comment"
        size="small"
        defaultValue={updatedContent}
        fullWidth
        onChange={(e) => setUpdatedContent(e.target.value)}
      />
      <Box
        mt={1}
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          onClick={() => setShouldEdit(false)}
          size="small"
          variant="outlined"
          type="button"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdateComment}
          size="small"
          variant="contained"
          type="button"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentEditForm;
