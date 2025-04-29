import Authors from "@/components/authors";
import SEOHead from "@/components/common/SEOHead";

const AuthorsPage = () => {
  return (
    <>
      <SEOHead title={`Authors - Thynkray}`} />
      <Authors />
    </>
  );
};

export default AuthorsPage;
