import { Box, Button, Typography } from "@mui/material";
import React from "react";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import { useGetPostsByAuthor } from "@/modules/post/hooks";
import CommonPostLoadingSkeleton from "../common/CommonPostLoadingSkeleton";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useGetLoggedInUser();
  const { isLoading, posts } = useGetPostsByAuthor(user?.id);
  return (
    <Box component={"section"}>
      <UserInfo
        user={user}
        totalPosts={posts?.length || 0}
        isLoading={isLoading}
      />
      {isLoading ? (
        <CommonPostLoadingSkeleton />
      ) : (
        <>
          {posts.length <= 0 ? (
            <NoDataFound message="No Posts found!">
              <Typography>
                You have not created any posts yet. Start sharing your
                knowledge!
              </Typography>
              <Link href={"/write/new"}>
                <Button variant="contained" type="button" sx={{ mt: 1 }}>
                  Create Post
                </Button>
              </Link>
            </NoDataFound>
          ) : (
            <UserPosts posts={posts || []} />
          )}
        </>
      )}
    </Box>
  );
};

export default Dashboard;
