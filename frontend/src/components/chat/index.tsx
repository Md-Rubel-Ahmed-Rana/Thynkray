import { Box } from "@mui/material";
import ChatSidebarDrawer from "./SidebarDrawer";
import MainContentLayout from "./MainContentLayout";

const ChatAI = () => {
  return (
    <Box display="flex" width="100%" height="100vh">
      <Box width={"20%"}>
        <ChatSidebarDrawer />
      </Box>
      <Box width={"80%"}>
        <MainContentLayout />
      </Box>
    </Box>
  );
};

export default ChatAI;
