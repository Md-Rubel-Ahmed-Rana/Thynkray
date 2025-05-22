import { Box, Typography } from "@mui/material";
import MessageForm from "./MessageForm";
import ChatSidebar from "./ChatSidebar";
import ChatWelcomeUI from "./ChatWelcomeUI";
import Navbar from "../common/Navbar";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import LoginButton from "../common/LoginButton";

const InitialChatUI = () => {
  const { user } = useGetCurrentUser();
  return (
    <>
      {user?.id ? (
        <Box display="flex" height="100vh">
          <ChatSidebar />
          <Box flex={1} display="flex" flexDirection="column">
            <Navbar />
            <ChatWelcomeUI />
            <MessageForm />
          </Box>
        </Box>
      ) : (
        <Box>
          <Navbar />
          <Box
            sx={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography>You are not a logged in user</Typography>
            <Typography>Please login to use the chat feature.</Typography>
            <LoginButton />
          </Box>
        </Box>
      )}
    </>
  );
};

export default InitialChatUI;
