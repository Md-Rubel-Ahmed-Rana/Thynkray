/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { FormEvent } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import { useRouter } from "next/router";

const SearchForm = () => {
  const router = useRouter();

  const handleRedirectToSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as any;
    const searchText = form.search.value;
    if (searchText) {
      router.push(`/posts/search?q=${searchText}`);
    }
  };

  return (
    <Box
      component={"form"}
      sx={{
        width: "100%",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: { xs: "20px", md: "0px" },
      }}
      onSubmit={handleRedirectToSearch}
    >
      <FormControl sx={{ width: "96%" }} variant="outlined">
        <OutlinedInput
          title="Enter your favorite words"
          size="small"
          id="search"
          name="search"
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
      <IconButton
        title="Click to search posts"
        type="submit"
        sx={{ width: "4%" }}
        size="small"
        aria-label="RSS feed"
      >
        <RssFeedRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default SearchForm;
