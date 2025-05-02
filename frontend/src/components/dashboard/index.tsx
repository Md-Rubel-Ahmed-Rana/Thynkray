import { Box } from "@mui/material";
import React from "react";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import { useGetPostsByAuthor } from "@/modules/post/hooks";

const Dashboard = () => {
  const { user } = useGetLoggedInUser();
  const { isLoading, posts } = useGetPostsByAuthor(user?.id);
  console.log({ isLoading, posts });
  return (
    <Box component={"section"}>
      <UserInfo user={user} totalPosts={posts?.length || 0} />
      <UserPosts posts={posts || []} />
    </Box>
  );
};

export default Dashboard;
