import AboutUs from "@/components/about";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const AboutPage = () => {
  return (
    <>
      <SEOHead title={`About Me - Thynkray`} />
      <AboutUs />
    </>
  );
};

export default AboutPage;

AboutPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
