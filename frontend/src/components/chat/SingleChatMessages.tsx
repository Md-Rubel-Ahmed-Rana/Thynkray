import { Box } from "@mui/material";
import ChatSidebar from "./ChatSidebar";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import Navbar from "../common/Navbar";

const SingleChatMessages = () => {
  return (
    <Box display="flex" height="100vh">
      <ChatSidebar />
      <Box flex={1} display="flex" flexDirection="column">
        <Navbar />
        <Messages />
        <MessageForm />
      </Box>
    </Box>
  );
};

export default SingleChatMessages;
