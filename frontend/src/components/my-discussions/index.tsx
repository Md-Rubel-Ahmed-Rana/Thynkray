import { getDiscussionsByUser } from "@/modules/discussion/api";
import { Discussion } from "@/modules/discussion/types";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import DiscussCard from "./DiscussCard";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";
import MyDiscussLoadingSkeleton from "@/skeletons/MyDiscussLoadingSkeleton";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const MyDiscussions = () => {
  const { user } = useGetCurrentUser();

  const { data, isLoading } = useQuery({
    queryKey: ["discussions"],
    queryFn: () => getDiscussionsByUser(user?.id),
    enabled: !!user?.id,
  });

  const discussions = (data || []) as Discussion[];

  return (
    <Box>
      <Typography marginBottom={2} variant="h5">
        My Discussions
      </Typography>
      {isLoading ? (
        <MyDiscussLoadingSkeleton />
      ) : (
        <Box>
          {discussions?.length <= 0 ? (
            <NoDataFound message="No discussions found!">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography>We did not find discussions for you.</Typography>
                <Typography>
                  You may have not created any discussion yet.
                </Typography>
                <Link href={"/discussion/create"}>
                  <Button variant="contained">Create Now</Button>
                </Link>
              </Box>
            </NoDataFound>
          ) : (
            <>
              {discussions.map((discuss) => (
                <DiscussCard key={discuss?.id} discuss={discuss} />
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MyDiscussions;
