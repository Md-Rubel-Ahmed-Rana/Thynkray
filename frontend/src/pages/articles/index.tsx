import Articles from "@/components/articles";
import SEOHead from "@/components/common/SEOHead";
import React, { ReactElement } from "react";
import RootLayout from "@/layout/RootLayout";

const ArticlesPage = () => {
  return (
    <>
      <SEOHead title="Articles - Thynkray" />
      <Articles />
    </>
  );
};

export default ArticlesPage;

ArticlesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
