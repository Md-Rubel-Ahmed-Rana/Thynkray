import { useUpdateComment } from "@/modules/comment/hooks";
import { Comment } from "@/modules/comment/types";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  comment: Comment;
  setShouldEdit: (value: boolean) => void;
};

const CommentEditForm = ({ comment, setShouldEdit }: Props) => {
  const [updatedContent, setUpdatedContent] = useState(comment?.content);
  const { updateComment, isLoading } = useUpdateComment();

  const handleUpdateComment = async () => {
    await updateComment({
      postId: comment?.post?.id as string,
      commentId: comment?.id,
      content: updatedContent,
    });

    toast.success("Comment updated successfully!");

    setShouldEdit(false);
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
