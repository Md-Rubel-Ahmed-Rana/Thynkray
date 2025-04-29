import { Box, Typography } from "@mui/material";

type PostDescriptionProps = {
  description: string;
};

const PostDescription = ({ description }: PostDescriptionProps) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="body1"
        sx={{ fontSize: "1.1rem", color: "text.secondary" }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default PostDescription;
