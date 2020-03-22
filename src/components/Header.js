import React from "react";
import CarrotIcon from "../carrot.svg";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <img src={CarrotIcon} className="app-logo" alt="logo" />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          OlyEats
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
