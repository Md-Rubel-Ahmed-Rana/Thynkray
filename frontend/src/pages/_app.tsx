/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import RootLayout from "@/layout/RootLayout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SessionProvider session={(pageProps as any).session}>
        <RootLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </RootLayout>
      </SessionProvider>
    </ThemeProvider>
  );
}
