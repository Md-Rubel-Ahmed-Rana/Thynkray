import { Box } from "@mui/material";
import { useRouter } from "next/router";
import DiscussionSection from "./Discussion";
import Answers from "./Answers";
import DiscussionDetailsLoadingSkeleton from "@/skeletons/DiscussionDetailsLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getSingleDiscussion } from "@/modules/discussion/api";
import { Discussion } from "@/modules/discussion/types";
import { useIncrementDiscussionViews } from "@/hooks/useIncrementDiscussionViews";

const DiscussionDetails = () => {
  const { query } = useRouter();
  const id = query?.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["discussion", id],
    queryFn: () => getSingleDiscussion(id),
  });
  const discussion = data as Discussion;

  // Increment views (custom hook)
  useIncrementDiscussionViews(id);

  return (
    <Box>
      {isLoading ? (
        <DiscussionDetailsLoadingSkeleton />
      ) : (
        <>
          <DiscussionSection discuss={discussion} />
          <Answers answers={discussion?.answers} />
        </>
      )}
    </Box>
  );
};

export default DiscussionDetails;
