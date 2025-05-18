import { useGetAllDiscussions } from "@/modules/discussion/hooks";
import NoDataFound from "../common/NoDataFound";
import { Box, Button, Typography } from "@mui/material";
import DiscussCard from "./DiscussCard";
import DiscussionHeader from "./DiscussionHeader";
import PaginationTopics from "./Pagination";

const Topics = () => {
  const { data, isLoading } = useGetAllDiscussions();
  const { discussions, limit, page, totalCount } = data;
  return (
    <Box>
      {isLoading ? (
        <h1>Discussions loading...</h1>
      ) : (
        <Box>
          <DiscussionHeader total={totalCount} />
          {discussions?.length <= 0 ? (
            <NoDataFound message="No topics found">
              <Typography>We have not found any topics yet.</Typography>
              <Typography>
                Would you like to create/ask question?. Click below button!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                }}
              >
                Ask Question
              </Button>
            </NoDataFound>
          ) : (
            <Box>
              {discussions.map((discuss) => (
                <DiscussCard key={discuss?.id} discuss={discuss} />
              ))}
            </Box>
          )}
          <PaginationTopics limit={limit} page={page} total={1000} />
        </Box>
      )}
    </Box>
  );
};

export default Topics;
