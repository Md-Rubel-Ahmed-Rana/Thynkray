import SEOHead from "@/components/common/SEOHead";
import PostsSearch from "@/components/posts/search";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const PostsSearchPage = () => {
  const { query } = useRouter();
  const searchText = query?.q as string;
  return (
    <>
      <SEOHead title={`${searchText || "unknown"}`} />
      <PostsSearch />
    </>
  );
};

export default PostsSearchPage;

PostsSearchPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
