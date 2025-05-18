import { useGetAllDiscussions } from "@/modules/discussion/hooks";
import NoDataFound from "../common/NoDataFound";
import { Box, Button, Typography } from "@mui/material";
import DiscussCard from "./DiscussCard";
import DiscussionHeader from "./DiscussionHeader";
import PaginationTopics from "./Pagination";

const Discussions = () => {
  const { data, isLoading } = useGetAllDiscussions();
  const { discussions, limit, page, totalCount } = data;
  return (
    <Box>
      <DiscussionHeader total={totalCount} limit={limit} />
      {isLoading ? (
        <h1>Discussions loading...</h1>
      ) : (
        <Box>
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
          <PaginationTopics limit={limit} page={page} total={totalCount} />
        </Box>
      )}
    </Box>
  );
};

export default Discussions;
