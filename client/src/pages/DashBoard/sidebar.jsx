import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarItems, openSidebar, toggleSidebar, isMobile, handlePageChange }) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "fixed",
          height: "100%",
        },
      }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={openSidebar}
      onClose={toggleSidebar}
    >
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={item.link ? Link : "div"}
            to={item.link || "#"}
            onClick={() => {
              item.action ? item.action() : handlePageChange(item.page);
              if (isMobile) toggleSidebar(); 
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
