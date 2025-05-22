import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { ContextProvider } from "@/context";
import { baseApi } from "@/modules";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import useGetTotalAIPromptCount from "@/hooks/useGetTotalAIPromptCount";
import { toast } from "react-toastify";
import { setLocalStorage } from "@/db/localStorage";

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
  const totalPromptCount = useGetTotalAIPromptCount(user?.id || "");

  const MAX_PROMPT_COUNT = 3;
  const MAX_PROMPT_COUNT_REACHED = totalPromptCount >= MAX_PROMPT_COUNT;

  const handleMaxPromptCount = () => {
    if (MAX_PROMPT_COUNT_REACHED) {
      toast.warn(
        `You have reached the maximum number of prompts (${MAX_PROMPT_COUNT}). You can't ask more questions at this time.`
      );
      return;
    }
  };

  const handleAsk = async () => {
    setLocalStorage(user?.id, totalPromptCount + 1);
    toast.warn(
      `You have used ${
        totalPromptCount + 1
      } out of ${MAX_PROMPT_COUNT} prompts.`
    );
    handleMaxPromptCount();
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
