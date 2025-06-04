import { Discussion } from "@/modules/discussion/types";
import { Box, Grid, Typography } from "@mui/material";
import DiscussionCard from "./DiscussionCard";

type Props = {
  discussions: Discussion[];
};

const HomeDiscussions = ({ discussions }: Props) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        Latest Discussions
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 12 }}
      >
        {discussions?.map((discussion: Discussion) => (
          <DiscussionCard discussion={discussion} key={discussion?.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomeDiscussions;
