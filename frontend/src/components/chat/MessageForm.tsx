import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

const StyledInputArea = styled(Box)({
  padding: "20px",
});

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const handleMessageSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };
  return (
    <StyledInputArea>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Ask me anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleMessageSend()}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleMessageSend}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </StyledInputArea>
  );
};

export default MessageForm;
