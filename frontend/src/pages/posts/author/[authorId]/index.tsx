import SEOHead from "@/components/common/SEOHead";
import AuthorPosts from "@/components/posts/author";
import { useRouter } from "next/router";

const AuthorPostsPage = () => {
  const { query } = useRouter();
  const name = query.name as string;
  return (
    <>
      <SEOHead title={`Posts of - ${name || ""}`} />
      <AuthorPosts />
    </>
  );
};

export default AuthorPostsPage;
