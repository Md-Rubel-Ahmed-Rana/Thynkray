import AllAuthors from "@/components/authors";
import SEOHead from "@/components/common/SEOHead";

const AuthorsPage = () => {
  return (
    <>
      <SEOHead title={`Authors - Thynkray`} />
      <AllAuthors />
    </>
  );
};

export default AuthorsPage;
