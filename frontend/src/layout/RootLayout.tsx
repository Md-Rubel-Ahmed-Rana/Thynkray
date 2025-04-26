import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
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
      <main
        style={{
          flex: 1,
          padding: "2rem",
          maxWidth: "1024px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default RootLayout;
