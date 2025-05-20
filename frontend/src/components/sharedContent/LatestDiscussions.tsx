import { getAllDiscussions } from "@/modules/discussion/api";
import { Discussion, Discussions } from "@/modules/discussion/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DiscussionCard from "./DiscussionCard";
import LatestDiscussionLoadingSkeleton from "@/skeletons/latestDiscussionLoadingSkeleton";
import NoDataFound from "../common/NoDataFound";

const LatestDiscussions = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: [
      "discussions",
      { page: 1, limit: 9, sortBy: "desc", searchText: "" },
    ],
    queryFn: getAllDiscussions,
  });

  const result = (data || []) as Discussions;

  return (
    <Box px={2} py={4}>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Latest Discussions
      </Typography>
      <Grid container spacing={3}>
        {isLoading ? (
          <LatestDiscussionLoadingSkeleton />
        ) : (
          <>
            {result?.discussions?.length <= 0 ? (
              <NoDataFound message="No discussion found!">
                <Typography>Oops! we did not found any discussions</Typography>
                <Typography marginY={2}>
                  It may cause any server side error
                </Typography>
                <Button variant="contained">Explore more</Button>
              </NoDataFound>
            ) : (
              <>
                {result?.discussions?.map((discussion: Discussion) => (
                  <DiscussionCard
                    discussion={discussion}
                    key={discussion?.id}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LatestDiscussions;
