import { Box, InputBase, Select, MenuItem, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const DiscussionSearchFilters = () => {
  const [sort, setSort] = useState("newest");

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
        />
      </Paper>

      {/* Sort Dropdown */}
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
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
