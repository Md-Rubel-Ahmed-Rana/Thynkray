import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";

const SearchContent = () => {
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "row",
        gap: 1,
        width: { xs: "100%", md: "fit-content" },
        overflow: "auto",
      }}
    >
      <FormControl
        sx={{ width: { xs: "100%", md: "25ch" } }}
        variant="outlined"
      >
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: "text.primary" }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "search",
          }}
        />
      </FormControl>
      <IconButton size="small" aria-label="RSS feed">
        <RssFeedRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default SearchContent;
