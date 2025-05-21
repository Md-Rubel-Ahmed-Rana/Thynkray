import SEOHead from "@/components/common/SEOHead";
import CreateDiscussion from "@/components/create-discussion";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const CreateDiscussionPage = () => {
  return (
    <>
      <SEOHead title={`Create Discussion - Thynkray`} />
      <CreateDiscussion />
    </>
  );
};

export default CreateDiscussionPage;

CreateDiscussionPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
