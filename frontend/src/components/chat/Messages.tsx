import { Box, Skeleton } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import SingleMessageCard from "./SingleMessageCard";
import { ContextProvider } from "@/context";
import { useQuery } from "@tanstack/react-query";
import { getMessageByChatId } from "@/modules/chat/api";
import { Message } from "@/modules/chat/types";
import { useRouter } from "next/router";

const Messages = () => {
  const { query } = useRouter();
  const chatId = query.chatId as string;
  const { data, isLoading } = useQuery({
    queryKey: ["chats-messages", chatId],
    queryFn: getMessageByChatId,
  });

  const messages = (data || []) as Message[];
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
        {isLoading ? (
          <Box display="flex" flexDirection="column" gap={1}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} variant="text" width="100%" />
            ))}
          </Box>
        ) : (
          <>
            {messages.map((msg) => (
              <SingleMessageCard key={msg.id} message={msg} />
            ))}
          </>
        )}

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
