import { Box } from "@mui/material";

import MessageForm from "./MessageForm";
import Messages from "./Messages";
import ChatSidebar from "./ChatSidebar";

const ChatUI = () => {
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

export default ChatUI;
