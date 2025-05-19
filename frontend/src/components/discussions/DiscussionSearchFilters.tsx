import { Box, InputBase, Select, MenuItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

let debounceTimer: NodeJS.Timeout;

const DiscussionSearchFilters = () => {
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const handleSearchDiscussions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchText(value);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
        exact: false,
      });
    }, 500);
  };

  const handleFilterDiscussions = (value: "desc" | "asc") => {
    setSort(value);
    queryClient.invalidateQueries({
      queryKey: ["discussions"],
      exact: false,
    });
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["discussions"],
      exact: false,
    });
  }, [queryClient, searchText, sort]);

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
