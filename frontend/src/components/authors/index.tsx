import { Box, Typography } from "@mui/material";
import Authors from "../sharedContent/Authors";
import NoDataFound from "../common/NoDataFound";
import LoginButton from "../common/LoginButton";
import AuthorLoadingSkeleton from "@/skeletons/AuthorLoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "@/modules/user/api";

const AllAuthors = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", "authors"],
    queryFn: getAuthors,
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meet Our Authors
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Explore the talented writers behind our content. Each author brings
        unique perspectives and expertise to the platform.
      </Typography>
      {isLoading ? (
        <AuthorLoadingSkeleton />
      ) : (
        <>
          {users.length <= 0 ? (
            <NoDataFound message="Authors  found!">
              <Typography
                sx={{
                  mb: 2,
                }}
              >
                We don&apos;t have any authors yet.
              </Typography>
              <LoginButton buttonSize="large" buttonText="Create Account" />
            </NoDataFound>
          ) : (
            <Authors authors={users} />
          )}
        </>
      )}
    </Box>
  );
};

export default AllAuthors;
