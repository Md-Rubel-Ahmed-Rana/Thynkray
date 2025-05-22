import { Box, Paper, Typography, useTheme } from "@mui/material";
import ReactMarkdown from "react-markdown";

type Props = {
  message: {
    id: string;
    content: string;
    role: string;
    createdAt: Date;
  };
};

const SingleMessageCard = ({ message }: Props) => {
  const theme = useTheme();
  const isOwn = message.role === "user";

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
      key={message.id}
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
        <ReactMarkdown>{message.content}</ReactMarkdown>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {new Date(message.createdAt).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default SingleMessageCard;
