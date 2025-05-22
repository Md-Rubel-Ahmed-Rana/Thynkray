import SEOHead from "@/components/common/SEOHead";
import AuthorPosts from "@/components/posts/author";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const AuthorPostsPage = () => {
  const { query } = useRouter();
  const name = query.name as string;
  return (
    <>
      <SEOHead title={`Posts by ${name || ""}`} />
      <AuthorPosts />
    </>
  );
};

export default AuthorPostsPage;

AuthorPostsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
