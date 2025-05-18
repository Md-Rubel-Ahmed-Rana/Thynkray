import SEOHead from "@/components/common/SEOHead";
import DiscussionDetails from "@/components/discussion-details";
import { useRouter } from "next/router";

const DiscussionDetailsPage = () => {
  const { query } = useRouter();
  const title = query.title as string;
  return (
    <>
      <SEOHead title={title || "Unknown"} />
      <DiscussionDetails />
    </>
  );
};

export default DiscussionDetailsPage;
