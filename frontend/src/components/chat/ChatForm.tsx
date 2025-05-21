import { Box, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatForm = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
      }}
    >
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          borderRadius: 4,
          boxShadow: "none",
          backgroundColor: "#fff",
        }}
      >
        <InputBase
          placeholder="Type your message..."
          sx={{ flex: 1, mr: 1 }}
          inputProps={{ "aria-label": "message input" }}
        />
        <IconButton type="submit" color="primary" aria-label="send">
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatForm;
