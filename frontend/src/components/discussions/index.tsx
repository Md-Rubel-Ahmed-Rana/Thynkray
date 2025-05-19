import NoDataFound from "../common/NoDataFound";
import { Box, Typography } from "@mui/material";
import DiscussCard from "./DiscussCard";
import DiscussionHeader from "./DiscussionHeader";
import PaginationTopics from "./Pagination";
import DiscussionsLoadingSkeleton from "@/skeletons/DiscussionsLoadingSkeleton";
import CreateDiscussionButton from "./CreateDiscussionButton";
import { useQuery } from "@tanstack/react-query";
import { getAllDiscussions } from "@/modules/discussion/api";

const Discussions = () => {
  const { data = { discussions: [], limit: 10, totalCount: 0 }, isLoading } =
    useQuery({
      queryKey: [
        "getAllDiscussions",
        { page: 1, limit: 10, sortBy: "desc", searchText: "" },
      ],
      queryFn: getAllDiscussions,
    });

  const { discussions, limit, totalCount } = data;
  return (
    <Box>
      <DiscussionHeader total={totalCount} limit={limit} />
      {isLoading ? (
        <DiscussionsLoadingSkeleton />
      ) : (
        <Box>
          {discussions?.length <= 0 ? (
            <NoDataFound message="No topics found">
              <Typography>We have not found any topics yet.</Typography>
              <Typography>
                Would you like to create/ask question?. Click below button!
              </Typography>
              <CreateDiscussionButton />
            </NoDataFound>
          ) : (
            <Box>
              {discussions.map((discuss) => (
                <DiscussCard key={discuss?.id} discuss={discuss} />
              ))}
            </Box>
          )}
          <PaginationTopics />
        </Box>
      )}
    </Box>
  );
};

export default Discussions;
