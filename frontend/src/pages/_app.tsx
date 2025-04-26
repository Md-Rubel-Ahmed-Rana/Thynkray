import type { AppProps } from "next/app";
import RootLayout from "@/layout/RootLayout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import ContextAPI from "@/context";
import CustomCursor from "@/components/common/CustomCursor";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ContextAPI>
      <CssBaseline />
      <CustomCursor />
      <SessionProvider session={pageProps.session}>
        <RootLayout>
          <Component {...pageProps} />
          <ToastContainer />
        </RootLayout>
      </SessionProvider>
    </ContextAPI>
  );
}
