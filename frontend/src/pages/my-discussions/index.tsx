import SEOHead from "@/components/common/SEOHead";
import MyDiscussions from "@/components/my-discussions";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const MyDiscussionsPage = () => {
  return (
    <>
      <SEOHead title={"My Discussions - Thynkray"} />
      <MyDiscussions />
    </>
  );
};

export default MyDiscussionsPage;

MyDiscussionsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
