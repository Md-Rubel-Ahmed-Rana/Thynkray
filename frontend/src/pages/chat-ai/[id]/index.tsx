import SingleChatMessages from "@/components/chat/SingleChatMessages";
import SEOHead from "@/components/common/SEOHead";
import { useRouter } from "next/router";

const SingleChatAIPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={title || "Unknown Chat"} />
      <SingleChatMessages />
    </>
  );
};

export default SingleChatAIPage;
