import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Box
        component={"main"}
        style={{
          flex: 1,
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
        }}
        sx={{ padding: { xs: "1rem", md: "1.5rem" } }}
      >
        {children}
      </Box>
    </main>
  );
};

export default ChatLayout;
