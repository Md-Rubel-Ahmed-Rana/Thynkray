import SEOHead from "@/components/common/SEOHead";
import PostDetails from "@/components/postDetails";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const PostDetailsPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={`${title || "Post title"}`} />
      <PostDetails />
    </>
  );
};

export default PostDetailsPage;

PostDetailsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
