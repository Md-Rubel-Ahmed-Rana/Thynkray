import { User } from "@/modules/user/types";
import { Avatar, Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const Author = ({
  author,
  publishedAt = new Date(),
}: {
  author: Partial<User>;
  publishedAt: Date;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          alt={author.name}
          src={author.profile_image}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption">{author.name}</Typography>
      </Box>
      <Typography variant="caption">
        {dayjs(new Date(publishedAt)).format("MMM D, YYYY")}
      </Typography>
    </Box>
  );
};

export default Author;
