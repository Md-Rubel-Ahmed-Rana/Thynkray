import { Box, Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const SidebarTop = () => {
  return (
    <Box position={"sticky"} p={1}>
      <Button
        sx={{ mb: 1 }}
        fullWidth
        variant="contained"
        href="/chat-ai"
        component={Link}
      >
        New Chat
      </Button>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search chats..."
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SidebarTop;
