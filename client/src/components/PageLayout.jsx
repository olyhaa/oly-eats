import React from 'react';
import PropTypes from 'prop-types';
import { map, find } from 'ramda';
import compose from 'lodash.flowright';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { graphql } from '@apollo/react-hoc';
import { makeStyles } from '@material-ui/core/styles';
import {
  getRecipeQuery,
  getUpdateFavoriteRecipeMutation,
} from 'utils/FetchData';
import { RECIPE } from 'utils/recipeConstants';
import {
  ADD_RECIPE_PAGE,
  ADMIN_PAGE,
  EDIT_RECIPE_PAGE,
  ERROR_PAGE,
  HOME_PAGE,
  RECIPE_DETAIL_PAGE,
} from 'utils/PageConstants';
import Header from './Header';

const useStyles = makeStyles(() => ({
  mainContent: {
    maxWidth: '1500px',
    margin: '0 auto',
  },
}));

const PageLayout = ({ children, updateMutation }) => {
  const classes = useStyles();
  const routeMatches = map(useRouteMatch, [
    HOME_PAGE,
    ADMIN_PAGE,
    `${RECIPE_DETAIL_PAGE}/:id`,
    ADD_RECIPE_PAGE,
    `${EDIT_RECIPE_PAGE}/:id`,
    ERROR_PAGE,
  ]);
  const match = find((route) => route?.isExact, routeMatches);
  const recipeId = match?.params?.id;
  const { data: recipeData, loading: recipeDataLoading } = useQuery(
    getRecipeQuery(),
    {
      variables: { id: recipeId },
    }
  );

  const handleFavorite = (newValue) => {
    updateMutation({
      variables: { id: recipeId, isFavorite: newValue },
      refetchQueries: ['GetAllRecipes', 'GetRecipe'],
    });
  };

  let title = 'OlyEats';
  const props = {};

  if (match) {
    if (match.url === ADMIN_PAGE) {
      title = 'OlyEats: Admin';
    } else if (match.url === ADD_RECIPE_PAGE) {
      title = 'New Recipe';
    } else if (match.url === ERROR_PAGE) {
      title = "You've Found an Error!";
    } else if (match.url.includes(EDIT_RECIPE_PAGE)) {
      title = 'Edit Recipe';
    } else if (match.url.includes(RECIPE_DETAIL_PAGE) && recipeId) {
      if (recipeDataLoading) {
        title = 'Loading Recipe';
      } else {
        title = recipeData?.recipe?.[RECIPE.TITLE];
        props.showFavorite = true;
        props.isFavorite = !!recipeData?.recipe?.[RECIPE.IS_FAVORITE];
        props.setIsFavorite = handleFavorite;
      }
    }
  }
  return (
    <>
      <Header title={title} {...props} />
      <main className={classes.mainContent}>{children}</main>
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  updateMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getUpdateFavoriteRecipeMutation(), {
    name: 'updateMutation',
  })
)(PageLayout);
