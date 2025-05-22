import { Box } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { messages } from "./dummy";
import SingleMessageCard from "./SingleMessageCard";
import { ContextProvider } from "@/context";

const Messages = () => {
  const { aiResponse, question } = useContext(ContextProvider);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [aiResponse]);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        {messages.map((msg) => (
          <SingleMessageCard key={msg.id} message={msg} />
        ))}

        {question && (
          <SingleMessageCard
            key={"question"}
            message={{
              id: "3434",
              content: question,
              role: "user",
              createdAt: new Date(),
            }}
          />
        )}

        {aiResponse && (
          <SingleMessageCard
            key={"response"}
            message={{
              id: "4545",
              content: aiResponse,
              role: "assistant",
              createdAt: new Date(),
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Messages;
