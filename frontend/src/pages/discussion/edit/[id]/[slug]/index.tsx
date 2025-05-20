import SEOHead from "@/components/common/SEOHead";
import DiscussionEdit from "@/components/discussion-edit";
import { useRouter } from "next/router";

const DiscussionEditPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <SEOHead title={`Edit Discussion- ${title || "unknown"}`} />
      <DiscussionEdit />
    </>
  );
};

export default DiscussionEditPage;
