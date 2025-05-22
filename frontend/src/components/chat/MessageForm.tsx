import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { ContextProvider } from "@/context";
import { baseApi } from "@/modules";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const StyledInputArea = styled(Box)({
  padding: "20px",
});

const MessageForm = () => {
  const { user } = useGetCurrentUser();
  const { setAiResponse, setQuestion } = useContext(ContextProvider);
  const router = useRouter();
  const chatId = router.query.chatId as string;
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setQuestion(userInput);
    setAiResponse("");
    setLoading(true);

    const res = await fetch(
      `${baseApi}/openai/ask?userId=${user?.id}&chatId=${
        chatId || ""
      }&question=${encodeURIComponent(userInput)}`,
      {
        credentials: "include",
      }
    );

    if (!res.body) return;

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let chatIdExtracted = false;

    const readChunk = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (!chatId) {
          if (!chatIdExtracted && value.startsWith("[CHAT_ID]")) {
            const endOfId = value.indexOf("\n");
            const newChatId = value.slice(9, endOfId).trim();
            console.log("Extracted CHAT_ID:", newChatId);
            router.push(`/chat-ai/${newChatId}?title=${userInput}`);
            chatIdExtracted = true;

            setAiResponse((prev) => prev + value.slice(endOfId + 1));
          } else {
            setAiResponse((prev) => prev + value);
          }
        } else {
          setAiResponse((prev) => prev + value);
        }
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
