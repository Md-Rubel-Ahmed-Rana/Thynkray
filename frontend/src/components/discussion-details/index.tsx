import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import DiscussionSection from "./Discussion";
import { useGetSingleDiscussion } from "@/modules/discussion/hooks";

const DiscussionDetails = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const { discussion, isLoading } = useGetSingleDiscussion(id);
  return (
    <Box>
      {isLoading ? (
        <Box>
          <Typography>Discussion loading...</Typography>
        </Box>
      ) : (
        <DiscussionSection discuss={discussion} />
      )}
    </Box>
  );
};

export default DiscussionDetails;
