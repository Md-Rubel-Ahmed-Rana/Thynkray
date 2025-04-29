import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

const PostDetails = () => {
  const { query } = useRouter();
  const slug = query.slug as string;
  return (
    <Box>
      <Typography>Post for: {slug}</Typography>
    </Box>
  );
};

export default PostDetails;
