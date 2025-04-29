import Articles from "@/components/articles";
import SEOHead from "@/components/common/SEOHead";
import React from "react";

const ArticlesPage = () => {
  return (
    <>
      <SEOHead title="Articles - Thynkray" />
      <Articles />
    </>
  );
};

export default ArticlesPage;
