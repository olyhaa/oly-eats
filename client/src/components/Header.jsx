import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CarrotIcon from '../images/carrot.svg';
import './Header.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
  },
}));

function Header({ title }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" component={Link} to="/home">
          <img src={CarrotIcon} className="app-logo" alt="OlyEats" />
        </IconButton>
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          data-test="app-title"
        >
          {title}
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/admin"
          data-test="admin-menu"
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
