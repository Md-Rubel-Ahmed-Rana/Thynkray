import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { useGetLoggedInUser } from "@/modules/user/hooks";
import LoginButton from "./LoginButton";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { CircularProgress } from "@mui/material";

const pages = ["Articles", "Discussions", "Write", "Authors", "About"];
const settings = ["Profile", "Dashboard"];

const Navbar = () => {
  const { user, isLoading } = useGetLoggedInUser();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              textDecoration: "none",
              mr: 2,
            }}
          >
            <Box
              component="img"
              src="/favicon.ico"
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1, borderRadius: "50%" }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Thynkray
            </Typography>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`${
                      page === "Write" ? "/write/new" : `/${page.toLowerCase()}`
                    }`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              flexGrow: 1,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/favicon.ico"
              alt="Logo"
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Thynkray
            </Typography>
          </Box>

          {/* Pages for desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Link
                style={{ textDecoration: "none" }}
                key={page}
                href={`${
                  page === "Write" ? "/write/new" : `/${page.toLowerCase()}`
                }`}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "text.primary", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* User Avatar */}
          <Box sx={{ display: "flex", flexGrow: 0, alignItems: "center" }}>
            <ThemeSwitcher />
            {isLoading ? (
              <CircularProgress size="20px" />
            ) : (
              <>
                {user && user?.id ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" src={user?.profile_image} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <LoginButton />
                )}
              </>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link
                    style={{
                      textDecoration: "none",
                      width: "100%",
                    }}
                    key={setting}
                    href={`/${setting.toLowerCase()}?name=${user?.name}&email=${
                      user?.email
                    }&designation=${user?.designation || "unknown"}`}
                  >
                    <Typography
                      sx={{
                        color: "color.paper",
                      }}
                      width={"100%"}
                    >
                      {setting}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <LogoutButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
