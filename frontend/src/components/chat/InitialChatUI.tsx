import { Box } from "@mui/material";
import MessageForm from "./MessageForm";
import ChatSidebar from "./ChatSidebar";
import ChatWelcomeUI from "./ChatWelcomeUI";
import Navbar from "../common/Navbar";

const InitialChatUI = () => {
  return (
    <Box display="flex" height="100vh">
      <ChatSidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Navbar />
        <ChatWelcomeUI />
        <MessageForm />
      </Box>
    </Box>
  );
};

export default InitialChatUI;
