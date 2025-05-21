import { Box } from "@mui/material";
import React from "react";
import ChatSidebar from "./ChatSidebar";
import MessageForm from "./MessageForm";
import Messages from "./Messages";

const SingleChatMessages = () => {
  return (
    <Box display="flex" height="100vh">
      <ChatSidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Messages />
        <MessageForm />
      </Box>
    </Box>
  );
};

export default SingleChatMessages;
