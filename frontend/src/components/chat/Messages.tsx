/* eslint-disable react-hooks/exhaustive-deps */
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
  const chatId = query.id as string;
  const { data = [], isLoading } = useQuery({
    queryKey: ["chats-messages", chatId],
    queryFn: () => getMessageByChatId(chatId),
    enabled: !!chatId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const messages = (data || []) as Message[];
  const { aiResponse, question } = useContext(ContextProvider);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [aiResponse, question, messages]);

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
            {messages?.length > 0 ? (
              messages?.map((message) => (
                <SingleMessageCard
                  key={message.id}
                  message={{
                    id: message.id,
                    content: message.content,
                    role: message.role,
                    createdAt: new Date(message.createdAt),
                  }}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <p>No messages found</p>
              </Box>
            )}
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
