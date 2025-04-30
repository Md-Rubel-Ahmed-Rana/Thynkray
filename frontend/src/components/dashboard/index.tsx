import { Box } from "@mui/material";
import React from "react";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";

const Dashboard = () => {
  return (
    <Box component={"section"}>
      <UserInfo />
      <UserPosts />
    </Box>
  );
};

export default Dashboard;
