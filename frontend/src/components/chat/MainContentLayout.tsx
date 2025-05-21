import { Box } from "@mui/material";
import ChatForm from "./ChatForm";
import Messages from "./Messages";

const MainContentLayout = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scrollable messages area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "80px", // leave space for the fixed chat form
        }}
      >
        <Messages />
      </Box>

      {/* Fixed ChatForm at the bottom */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: "white",
          borderTop: "1px solid #ccc",
        }}
      >
        <ChatForm />
      </Box>
    </Box>
  );
};

export default MainContentLayout;
