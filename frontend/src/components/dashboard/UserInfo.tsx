import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import Link from "next/link";

const user = {
  name: "Jane Doe",
  designation: "Senior Software Engineer",
  profile_image: "https://i.pravatar.cc/150?img=47",
};

const UserInfo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        backgroundColor: isDark ? "grey.900" : "grey.100",
        borderRadius: 2,
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Avatar
          src={user.profile_image}
          alt={user.name}
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.designation}
          </Typography>
        </Box>
      </Box>
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
          Total Posts: <strong>345</strong>
        </Typography>

        <Link href={"/write"}>
          <Button variant="contained" color="primary">
            Create Post
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default UserInfo;
