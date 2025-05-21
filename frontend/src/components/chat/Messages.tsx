import { Box, Typography } from "@mui/material";

const messages = [
  {
    id: "1",
    content: "Hello, how are you?",
    role: "user",
  },
  {
    id: "2",
    content: "I'm fine, thank you! How about you?",
    role: "assistant",
  },
  {
    id: "3",
    content: "What are you doing today?",
    role: "user",
  },
  {
    id: "4",
    content: "Just working on some projects. You?",
    role: "assistant",
  },
];

const Messages = () => {
  return (
    <Box>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            mb: 2,
            p: 1,
            borderRadius: 1,
            backgroundColor: message.role === "user" ? "#e0f7fa" : "#f1f1f1",
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Messages;
