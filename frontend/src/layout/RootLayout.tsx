import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <Box
        component={"main"}
        style={{
          flex: 1,
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
        }}
        sx={{ padding: { xs: "1rem", md: "1.5rem" } }}
      >
        {children}
      </Box>
      <Footer />
    </main>
  );
};

export default RootLayout;
