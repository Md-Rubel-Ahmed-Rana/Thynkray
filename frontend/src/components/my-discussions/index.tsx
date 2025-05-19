import { getDiscussionsByUser } from "@/modules/discussion/api";
import { Discussion } from "@/modules/discussion/types";
import { getCurrentUser } from "@/modules/user/api";
import { User } from "@/modules/user/types";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import DiscussCard from "./DiscussCard";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";
import MyDiscussLoadingSkeleton from "@/skeletons/MyDiscussLoadingSkeleton";

const MyDiscussions = () => {
  const { data: session } = useSession();
  const { data: userData } = useQuery({
    queryKey: ["user", session?.user?.email as string],
    queryFn: getCurrentUser,
  });
  const user = userData as User;

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
