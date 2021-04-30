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
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CarrotIcon from '../images/carrot.svg';
import './Header.css';
import { HOME_PAGE } from 'utils/PageConstants';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
  },
}));

function Header({ title, showFavorite, isFavorite, setIsFavorite }) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          component={Link}
          to={HOME_PAGE}
        >
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
        {showFavorite && (
          <IconButton
            aria-label="favorite"
            color="secondary"
            size="medium"
            onClick={() => {
              setIsFavorite(!isFavorite);
            }}
            data-test={`favorite-start-${isFavorite}`}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )}
        <Button
          color="inherit"
          component={Link}
          to={ADMIN_PAGE}
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
  setIsFavorite: () => {},
  showFavorite: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showFavorite: PropTypes.bool,
  isFavorite: PropTypes.bool,
  setIsFavorite: PropTypes.func,
};

export default Header;
