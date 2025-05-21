import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import ThemeSwitcher from "../common/ThemeSwitcher";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";

const StyledSearchBox = styled(TextField)({
  marginTop: "10px",
  "& .MuiOutlinedInput-root": {
    color: "#ffffff",
    "& fieldset": {
      borderColor: "#424242",
    },
    "&:hover fieldset": {
      borderColor: "#666666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0d47a1",
    },
  },
});

const SidebarTop = () => {
  return (
    <Box position={"sticky"} p={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button fullWidth variant="outlined" size="small">
          <ThemeSwitcher />
        </Button>
        <Button size="large" fullWidth variant="contained" sx={{ py: "10px" }}>
          New Chat
        </Button>
      </Box>
      <StyledSearchBox
        fullWidth
        variant="outlined"
        placeholder="Search chats..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SidebarTop;
