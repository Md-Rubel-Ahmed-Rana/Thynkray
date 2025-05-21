import SEOHead from "@/components/common/SEOHead";
import DiscussionEdit from "@/components/discussion-edit";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const DiscussionEditPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <SEOHead title={`Edit Discussion- ${title || "unknown"}`} />
      <DiscussionEdit />
    </>
  );
};

export default DiscussionEditPage;

DiscussionEditPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
