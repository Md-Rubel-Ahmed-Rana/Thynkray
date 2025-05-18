import { Box, InputBase, Select, MenuItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDiscussionStore } from "@/modules/discussion/provider";

let debounceTimer: NodeJS.Timeout;

const DiscussionSearchFilters = () => {
  const { getAllDiscussion } = useDiscussionStore((state) => state);
  const [sort, setSort] = useState("newest");

  const handleSearchDiscussions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchText = event.target.value;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      getAllDiscussion(1, 10, searchText, "desc");
    }, 500);
  };

  const handleFilterDiscussions = (value: "newest" | "oldest") => {
    setSort(value);
    getAllDiscussion(1, 10, "", value === "newest" ? "desc" : "asc");
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
          handleFilterDiscussions(e.target.value as "newest" | "oldest")
        }
        displayEmpty
        size="small"
        sx={{ minWidth: { xs: "100%", md: 140 } }}
      >
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
      </Select>
    </Box>
  );
};

export default DiscussionSearchFilters;
