import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Bounce, ToastContainer } from "react-toastify";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import ContextAPI from "@/context";
import CustomCursor from "@/components/common/CustomCursor";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ReactElement, ReactNode, useEffect } from "react";
import "../styles/globals.css";
import ScrollToTopButton from "@/components/common/BottomToTopScrollButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
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
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ContextAPI>
          <CssBaseline />
          <CustomCursor />
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <ScrollToTopButton />
        </ContextAPI>
      </SessionProvider>
    </QueryClientProvider>
  );
}
