import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
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
  favoriteSpacer: {
    paddingLeft: '1.5rem',
  },
}));

function Header({ title, isFavorite }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" component={Link} to="/home">
          <img src={CarrotIcon} className="app-logo" alt="OlyEats" />
        </IconButton>
        {isFavorite && <StarIcon />}
        <Typography
          className={`${classes.title} ${
            !isFavorite && classes.favoriteSpacer
          }`}
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

Header.defaultProps = {
  isFavorite: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
};

export default Header;
