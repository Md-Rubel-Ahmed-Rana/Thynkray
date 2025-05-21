import { Box, Typography } from "@mui/material";

const ChatWelcomeUI = () => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Box
        width={"100%"}
        height={"100%"}
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <Typography variant="h4">Welcome to the Chat</Typography>
        <Typography variant="body1">
          Start chatting with our AI assistant!
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatWelcomeUI;
