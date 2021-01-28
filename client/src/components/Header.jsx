import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
  getRecipeQuery,
  removeNulls,
  getUpdateFavoriteRecipeMutation,
} from 'utils/FetchData';
import { RECIPE } from 'utils/recipeConstants';
import { PAGE_DATA, PAGE_ROUTES } from 'utils/pageConstants';
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

function Header({ updateMutation }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const pageData = PAGE_DATA.filter((pageItem) => {
    return pageItem.route === pathname.split('/')[1];
  })[0];

  const { title, showFavorite } = pageData;
  const isRecipePage = pageData.route === PAGE_ROUTES.RECIPE_PAGE;
  let pageTitle = title;
  let isFavorite = false;
  const id = isRecipePage && pathname.split('/')[2];
  const { data, error: errorRecipeData, loading: loadingRecipeData } = useQuery(
    getRecipeQuery(),
    {
      variables: { id },
      skip: pageData.route !== PAGE_ROUTES.RECIPE_PAGE,
    }
  );
  if (isRecipePage && !loadingRecipeData && data && !errorRecipeData) {
    const { recipe } = removeNulls(data);
    pageTitle = recipe ? recipe[RECIPE.TITLE] : '';
    isFavorite = recipe ? recipe[RECIPE.IS_FAVORITE] : '';
  }
  const handleFavorite = (newValue) => {
    updateMutation({
      variables: { id, isFavorite: newValue },
      refetchQueries: ['GetAllRecipes', 'GetRecipe'],
    });
  };

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
          {pageTitle}
        </Typography>
        {showFavorite && (
          <IconButton
            aria-label="favorite"
            color="secondary"
            size="medium"
            onClick={() => {
              handleFavorite(!isFavorite);
            }}
            data-test={`favorite-start-${isFavorite}`}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )}
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
  updateMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getUpdateFavoriteRecipeMutation(), {
    name: 'updateMutation',
  })
)(Header);
