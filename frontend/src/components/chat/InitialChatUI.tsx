import { Box } from "@mui/material";
import MessageForm from "./MessageForm";
import ChatSidebar from "./ChatSidebar";
import ChatWelcomeUI from "./ChatWelcomeUI";

const InitialChatUI = () => {
  return (
    <Box display="flex" height="100vh">
      <ChatSidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <ChatWelcomeUI />
        <MessageForm />
      </Box>
    </Box>
  );
};

export default InitialChatUI;
