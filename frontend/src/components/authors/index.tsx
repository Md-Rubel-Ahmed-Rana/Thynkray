import { Box, Typography } from "@mui/material";
import Authors from "../sharedContent/Authors";
import { useGetAuthors } from "@/modules/user/hooks";
import CommonPostLoadingSkeleton from "@/loadingSkeletons/CommonPostLoadingSkeleton";
import NoDataFound from "../common/NoDataFound";
import LoginButton from "../common/LoginButton";

const AllAuthors = () => {
  const { isLoading, users } = useGetAuthors();
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
        <CommonPostLoadingSkeleton />
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
