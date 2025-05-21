import SEOHead from "@/components/common/SEOHead";
import Discussions from "@/components/discussions";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const DiscussionsPage = () => {
  return (
    <>
      <SEOHead title={`Discussions - Thynkray`} />
      <Discussions />
    </>
  );
};

export default DiscussionsPage;

DiscussionsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
