import { getSingleDiscussion } from "@/modules/discussion/api";
import { Discussion } from "@/modules/discussion/types";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import NoDataFound from "../common/NoDataFound";
import DiscussionEditForm from "./DiscussionEditForm";

const DiscussionEdit = () => {
  const { query, back } = useRouter();
  const id = query?.id as string;
  const title = query?.title as string;
  const { data, isLoading } = useQuery({
    queryKey: ["discussion", id],
    queryFn: () => getSingleDiscussion(id),
  });

  const discussion = data as Discussion;

  return (
    <Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} width={Math.random() * 1000} height={40} />
          ))}
        </Box>
      ) : (
        <>
          {discussion ? (
            <DiscussionEditForm discuss={discussion} />
          ) : (
            <NoDataFound message="Discussion was not found">
              <Typography>We did not found the discussion {title}</Typography>
              <Typography>
                Either the discussion deleted or there was an error on server
              </Typography>
              <Button onClick={() => back()}>Go Back</Button>
            </NoDataFound>
          )}
        </>
      )}
    </Box>
  );
};

export default DiscussionEdit;
