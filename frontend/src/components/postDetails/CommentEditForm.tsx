import { Comment } from "@/modules/comment/types";
import { Box, Button, TextField } from "@mui/material";

type Props = {
  comment: Comment;
  setShouldEdit: (value: boolean) => void;
};

const CommentEditForm = ({ comment, setShouldEdit }: Props) => {
  return (
    <Box mt={2} width={"100%"}>
      <TextField
        name="content"
        label="Comment"
        size="small"
        defaultValue={comment?.content}
        fullWidth
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
        >
          Cancel
        </Button>
        <Button size="small" variant="contained" type="button">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CommentEditForm;
