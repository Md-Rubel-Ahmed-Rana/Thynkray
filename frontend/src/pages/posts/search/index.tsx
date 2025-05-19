import SEOHead from "@/components/common/SEOHead";
import PostsSearch from "@/components/posts/search";
import { useRouter } from "next/router";

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
