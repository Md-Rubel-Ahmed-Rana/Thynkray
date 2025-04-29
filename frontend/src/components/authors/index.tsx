import { authors } from "@/constants/authors";
import { Box, Typography } from "@mui/material";
import Authors from "../sharedContent/Authors";

const AllAuthors = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meet Our Authors
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore the talented writers behind our content. Each author brings
        unique perspectives and expertise to the platform.
      </Typography>
      <Authors authors={authors} />
    </Box>
  );
};

export default AllAuthors;
