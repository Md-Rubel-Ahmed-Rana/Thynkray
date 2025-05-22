import SEOHead from "@/components/common/SEOHead";
import Home from "@/components/home";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";
export default function HomePage() {
  return (
    <>
      <SEOHead title="Home - Thynkray" />
      <Home />
    </>
  );
}

HomePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
