import SEOHead from "@/components/common/SEOHead";
import CreatePost from "@/components/create-post";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const CreatePostPage = () => {
  return (
    <>
      <SEOHead title={`Create Post - Thynkray`} />
      <CreatePost />
    </>
  );
};

export default CreatePostPage;

CreatePostPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
