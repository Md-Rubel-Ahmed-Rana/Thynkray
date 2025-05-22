import SEOHead from "@/components/common/SEOHead";
import DiscussionDetails from "@/components/discussion-details";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DiscussionDetailsPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={title || "Unknown"} />
      <DiscussionDetails />
    </>
  );
};

export default DiscussionDetailsPage;

DiscussionDetailsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
