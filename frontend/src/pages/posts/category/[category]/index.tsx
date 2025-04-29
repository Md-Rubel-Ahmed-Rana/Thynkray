import SEOHead from "@/components/common/SEOHead";
import CategorizedPosts from "@/components/posts/category";
import { useRouter } from "next/router";
import React from "react";

const CategorizedPostsPage = () => {
  const { query } = useRouter();
  const category = query.category as string;
  return (
    <>
      <SEOHead title={`Posts - ${category}`} />
      <CategorizedPosts />
    </>
  );
};

export default CategorizedPostsPage;
