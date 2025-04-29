import SEOHead from "@/components/common/SEOHead";
import PostDetails from "@/components/postDetails";
import { useRouter } from "next/router";
import React from "react";

const PostDetailsPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={`Post - ${title || "title"}`} />
      <PostDetails />
    </>
  );
};

export default PostDetailsPage;
