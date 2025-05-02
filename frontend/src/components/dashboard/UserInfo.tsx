import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { User } from "@/modules/user/types";

type Props = {
  user: User;
  totalPosts: number;
  isLoading: boolean;
};

const UserInfo = ({ user, totalPosts, isLoading }: Props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        gap: 2,
        p: { xs: 1, md: 2 },
        backgroundColor: isDark ? "grey.900" : "grey.100",
        borderRadius: 2,
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {isLoading ? (
        <Box>
          <Skeleton variant="circular" width={60} height={60} />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", mt: 1 }}
            width={"250px"}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", mt: 1 }}
            width={"300px"}
          />
        </Box>
      ) : (
        <Box>
          <Avatar
            src={user.profile_image}
            alt={user.name}
            sx={{ width: 64, height: 64, mb: 1 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.designation}
          </Typography>
        </Box>
      )}
      <Box
        p={3}
        borderRadius={2}
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="body1" color="text.primary">
          Total Posts: <strong>{totalPosts}</strong>
        </Typography>

        <Link href={"/write/new"}>
          <Button variant="contained" color="primary">
            Create Post
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default UserInfo;
