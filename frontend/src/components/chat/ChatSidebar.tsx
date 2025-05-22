import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import ChatList from "./ChatList";
import SidebarTop from "./SidebarTop";

const StyledSidebar = styled(Box)(({}) => ({
  width: "300px",
  borderRight: "1px solid #333333",
}));

const ChatSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {isMobile && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Chat App</Typography>
          </Toolbar>
        </AppBar>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: 300 } }}
        >
          <SidebarTop />
          <ChatList />
        </Drawer>
      ) : (
        <StyledSidebar>
          <SidebarTop />
          <ChatList />
        </StyledSidebar>
      )}
    </>
  );
};

export default ChatSidebar;
