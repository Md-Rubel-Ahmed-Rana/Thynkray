import SEOHead from "@/components/common/SEOHead";
import CategorizedPosts from "@/components/posts/category";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const CategorizedPostsPage = () => {
  const { query } = useRouter();
  const category = query.category as string;
  return (
    <>
      <SEOHead title={`Posts - ${category || "unknown"}`} />
      <CategorizedPosts />
    </>
  );
};

export default CategorizedPostsPage;

CategorizedPostsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
