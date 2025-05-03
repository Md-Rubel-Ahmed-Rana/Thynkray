import SEOHead from "@/components/common/SEOHead";
import PostsSearch from "@/components/posts/search";
import { useRouter } from "next/router";
import React from "react";

const PostsSearchPage = () => {
  const { query } = useRouter();
  const searchText = query.q as string;
  return (
    <>
      <SEOHead title={`Posts - ${searchText || "unknown"}`} />
      <PostsSearch />
    </>
  );
};

export default PostsSearchPage;
