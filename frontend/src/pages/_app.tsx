import type { AppProps } from "next/app";
import RootLayout from "@/layout/RootLayout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <SessionProvider session={pageProps.session}>
        <RootLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </RootLayout>
      </SessionProvider>
    </>
  );
}
