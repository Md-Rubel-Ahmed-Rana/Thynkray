import AllAuthors from "@/components/authors";
import SEOHead from "@/components/common/SEOHead";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const AuthorsPage = () => {
  return (
    <>
      <SEOHead title={`Authors - Thynkray`} />
      <AllAuthors />
    </>
  );
};

export default AuthorsPage;

AuthorsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
