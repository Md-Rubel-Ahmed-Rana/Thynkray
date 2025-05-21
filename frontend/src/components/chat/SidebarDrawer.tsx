import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import ChatList from "./ChatList";
import { Button, InputBase, Paper } from "@mui/material";

const drawerWidth = 240;

const ChatSidebarDrawer = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box display="flex" flexDirection={"column"} alignItems="center" gap={1}>
        <Button fullWidth variant="contained">
          New Chat
        </Button>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            py: 0.5,
            flexGrow: 1,
            backgroundColor: "#f1f1f1",
          }}
        >
          <SearchIcon sx={{ color: "gray" }} />
          <InputBase
            placeholder="Search chat..."
            inputProps={{ "aria-label": "search" }}
            sx={{ flex: 1 }}
          />
        </Paper>
      </Box>

      <Box mt={2} px={2}>
        <ChatList />
      </Box>
    </Drawer>
  );
};

export default ChatSidebarDrawer;
