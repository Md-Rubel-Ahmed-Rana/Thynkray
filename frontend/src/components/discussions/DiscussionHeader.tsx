import { Box, Button, Typography } from "@mui/material";
import DiscussionSearchFilters from "./DiscussionSearchFilters";

type Props = {
  total: number;
  limit: number;
};

const DiscussionHeader = ({ total, limit }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "flex-start", sm: "space-between" },
        alignItems: { xs: "flex-start", sm: "center" },
        backgroundColor: "background.paper",
        borderBottom: "1px solid gray",
        gap: 2,
        py: 2,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          fontWeight: 500,
          display: "flex",
          gap: 1,
        }}
      >
        <Typography component={"span"}>{limit} of</Typography>
        <Typography component={"span"}>{total} Discussions</Typography>
      </Typography>

      {/* Filters */}
      <DiscussionSearchFilters />

      {/* Ask Question Button */}
      <Box sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
        <Button variant="contained" fullWidth={true}>
          Ask Question
        </Button>
      </Box>
    </Box>
  );
};

export default DiscussionHeader;
