import NoDataFound from "../common/NoDataFound";
import { Box, Typography } from "@mui/material";
import DiscussCard from "./DiscussCard";
import DiscussionHeader from "./DiscussionHeader";
import PaginationTopics from "./Pagination";
import DiscussionsLoadingSkeleton from "@/skeletons/DiscussionsLoadingSkeleton";
import CreateDiscussionButton from "./CreateDiscussionButton";
import { useQuery } from "@tanstack/react-query";
import { getAllDiscussions } from "@/modules/discussion/api";
import { useState } from "react";

const Discussions = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data = { discussions: [], limit: 10, totalCount: 0 }, isLoading } =
    useQuery({
      queryKey: [
        "discussions",
        { page, limit, sortBy: "desc", searchText: "" },
      ],
      queryFn: getAllDiscussions,
      enabled: true,
    });

  console.log({ from: "Discussions", isLoading, data });

  const { discussions, totalCount } = data;
  return (
    <Box>
      <DiscussionHeader total={totalCount} limit={data?.limit || 10} />
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
          <PaginationTopics
            limit={limit}
            page={page}
            setLimit={setLimit}
            setPage={setPage}
            totalCount={totalCount}
          />
        </Box>
      )}
    </Box>
  );
};

export default Discussions;
