import { getAllDiscussions } from "@/modules/discussion/api";
import { Discussion, Discussions } from "@/modules/discussion/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DiscussionCard from "./DiscussionCard";
import LatestDiscussionLoadingSkeleton from "@/skeletons/LatestDiscussionLoadingSkeleton";
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
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Latest Discussions
      </Typography>
      <Box>
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
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 4, md: 12 }}
              >
                {result?.discussions?.map((discussion: Discussion) => (
                  <DiscussionCard
                    discussion={discussion}
                    key={discussion?.id}
                  />
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default LatestDiscussions;
