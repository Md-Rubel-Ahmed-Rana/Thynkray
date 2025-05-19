import { Box, InputBase, Select, MenuItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

let debounceTimer: NodeJS.Timeout;

type Props = {
  setSearchText: (searchText: string) => void;
  sort: "desc" | "asc";
  setSort: (sort: "desc" | "asc") => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

const DiscussionSearchFilters = ({
  sort,
  setSort,
  setSearchText,
  setLimit,
  setPage,
}: Props) => {
  const handleSearchDiscussions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearchText(value);
      setLimit(10);
      setPage(1);
    }, 500);
  };

  const handleFilterDiscussions = (value: "desc" | "asc") => {
    setSort(value);
    setLimit(10);
    setPage(1);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      {/* Search Input */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: 300 },
          p: "4px 8px",
          boxShadow: 1,
        }}
      >
        <SearchIcon sx={{ color: "gray", mr: 1 }} />
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search discussion"
          inputProps={{ "aria-label": "search discussion" }}
          onChange={handleSearchDiscussions}
        />
      </Paper>

      {/* Sort Dropdown */}
      <Select
        value={sort}
        onChange={(e) =>
          handleFilterDiscussions(e.target.value as "desc" | "asc")
        }
        displayEmpty
        size="small"
        sx={{ minWidth: { xs: "100%", md: 140 } }}
      >
        <MenuItem value="desc">Newest</MenuItem>
        <MenuItem value="asc">Oldest</MenuItem>
      </Select>
    </Box>
  );
};

export default DiscussionSearchFilters;
