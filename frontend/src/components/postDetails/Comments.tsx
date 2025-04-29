import { comments } from "@/constants/comments";
import { Box, Typography, Avatar, Paper, Stack, Button } from "@mui/material";
import moment from "moment";

const Comments = () => {
  return (
    <Box>
      <Box display={"flex"} gap={2} mb={2}>
        <Typography variant="h6">
          {comments.length} Comment{comments.length !== 1 ? "s" : ""}
        </Typography>
        <Button type="button" variant="contained" size="small">
          Leave comment
        </Button>
      </Box>

      <Stack spacing={2}>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              backgroundColor: "background.paper",
            }}
          >
            <Avatar
              src={comment.user.profile_image}
              alt={comment.user.name}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography fontWeight={600}>{comment.user.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {moment(new Date(comment.createdAt)).fromNow()}
              </Typography>
              <Typography variant="body1">{comment.content}</Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;
