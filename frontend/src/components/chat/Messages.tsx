import { Box, Paper, Typography, useTheme } from "@mui/material";
import { messages } from "./dummy";

const Messages = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        {messages.map((msg) => {
          const isOwn = msg.role === "user";

          const backgroundColor = isOwn
            ? theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[300]
            : theme.palette.background.paper;

          const textColor = isOwn
            ? theme.palette.getContrastText(backgroundColor)
            : theme.palette.text.primary;

          return (
            <Box
              key={msg.id}
              display="flex"
              flexDirection="column"
              alignItems={isOwn ? "flex-end" : "flex-start"}
            >
              <Paper
                sx={{
                  padding: "10px 15px",
                  margin: "8px 0",
                  maxWidth: "70%",
                  width: "fit-content",
                  backgroundColor,
                  color: textColor,
                  borderRadius: "12px",
                  alignSelf: isOwn ? "flex-end" : "flex-start",
                }}
              >
                <Typography>{msg.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {msg.createdAt.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Messages;
