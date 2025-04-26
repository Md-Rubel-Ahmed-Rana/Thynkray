import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1024px;
  margin: 0 auto;
`;

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default RootLayout;
