import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { ContextProvider } from "@/context";

const StyledInputArea = styled(Box)({
  padding: "20px",
});

const MessageForm = () => {
  const { setAiResponse, setQuestion } = useContext(ContextProvider);
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setQuestion(userInput);
    setAiResponse("");
    setLoading(true);
    router.push("/chat-ai/new-chat");

    const res = await fetch(
      `http://localhost:5000/chatbot/stream?q=${encodeURIComponent(userInput)}`
    );

    if (!res.body) return;

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

    const readChunk = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setAiResponse((prev) => prev + value);
      }
      setLoading(false);
      setUserInput("");
    };
    readChunk();
  };

  return (
    <StyledInputArea>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={6}
        variant="outlined"
        placeholder="Ask me anything..."
        value={userInput}
        disabled={loading}
        onChange={(e) => setUserInput(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAsk} disabled={loading}>
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
