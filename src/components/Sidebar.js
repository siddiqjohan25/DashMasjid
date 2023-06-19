import React from "react";
import { makeStyles } from "@mui/material";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  sidebarItem: {
    borderRadius: "20px",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
    [theme.breakpoints.up("md")]: {
      margin: "10px 0px",
    },
  },
  listItemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
  },
}));

const SidebarItems = ({ icon, text, link }) => {
  const classes = useStyles();
  return (
    <ListItem button component={Link} to={link} className={classes.sidebarItem}>
      <ListItemIcon className={classes.listItemIcon}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default SidebarItems;
