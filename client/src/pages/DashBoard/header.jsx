import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ user, isMobile, toggleSidebar, openSidebar, theme }) => {
  const appBarTheme = theme || { zIndex: { drawer: 1200 } };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: appBarTheme.zIndex.drawer + 1,
        width: `calc(100% - ${openSidebar ? 240 : 0}px)`,
        transition: "width 0.3s ease",
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>

        {/* User Profile */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {user.name}
            </Typography>
            <Tooltip title="Profile">
              <IconButton color="inherit">
                <Avatar src={user.profilePicture} alt={user.name} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;


