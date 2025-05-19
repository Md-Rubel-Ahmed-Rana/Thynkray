import { Box, Typography } from "@mui/material";
import DiscussionSearchFilters from "./DiscussionSearchFilters";
import CreateDiscussionButton from "./CreateDiscussionButton";

type Props = {
  total: number;
  limit: number;
  setSearchText: (searchText: string) => void;
  sort: "desc" | "asc";
  setSort: (sort: "desc" | "asc") => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

const DiscussionHeader = ({
  total,
  limit,
  setSearchText,
  setSort,
  sort,
  setLimit,
  setPage,
}: Props) => {
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
      <DiscussionSearchFilters
        setSearchText={setSearchText}
        setSort={setSort}
        sort={sort}
        setLimit={setLimit}
        setPage={setPage}
      />

      {/* Ask Question Button */}
      <Box sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
        <CreateDiscussionButton />
      </Box>
    </Box>
  );
};

export default DiscussionHeader;
