import SEOHead from "@/components/common/SEOHead";
import EditPost from "@/components/editPost";
import { useRouter } from "next/router";

const CreatePostPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <SEOHead title={`Edit Post - ${title || "unknown"}`} />
      <EditPost />
    </>
  );
};

export default CreatePostPage;
