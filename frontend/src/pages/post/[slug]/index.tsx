import SEOHead from "@/components/common/SEOHead";
import PostDetails from "@/components/postDetails";
import { useRouter } from "next/router";

const PostDetailsPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={`${title || "Post title"}`} />
      <PostDetails />
    </>
  );
};

export default PostDetailsPage;
