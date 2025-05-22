import SEOHead from "@/components/common/SEOHead";
import EditPost from "@/components/editPost";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const UpdatePostPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <SEOHead title={`Edit Post - ${title || "unknown"}`} />
      <EditPost />
    </>
  );
};

export default UpdatePostPage;

UpdatePostPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
