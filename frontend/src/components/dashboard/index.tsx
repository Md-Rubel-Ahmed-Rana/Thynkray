import { Box, Button, Typography } from "@mui/material";
import React from "react";
import UserInfo from "./UserInfo";
import UserPosts from "./UserPosts";
import CommonPostLoadingSkeleton from "../../skeletons/CommonPostLoadingSkeleton";
import NoDataFound from "../common/NoDataFound";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPostsByAuthor } from "@/modules/post/api";
import { Post } from "@/modules/post/types";
import { getCurrentUser } from "@/modules/user/api";
import { useSession } from "next-auth/react";
import { User } from "@/modules/user/types";

const Dashboard = () => {
  const { data: session } = useSession();
  const { data: user } = useQuery({
    queryKey: ["user", session?.user?.email as string],
    queryFn: getCurrentUser,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["posts", user?.id as string],
    queryFn: getPostsByAuthor,
  });
  const posts = data as Post[];

  return (
    <Box component={"section"}>
      <UserInfo
        user={user as User}
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
