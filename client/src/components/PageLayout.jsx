import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { graphql } from '@apollo/react-hoc';
import {
  getRecipeQuery,
  getUpdateFavoriteRecipeMutation,
} from 'utils/FetchData';
import { map, find } from 'ramda';
import compose from 'lodash.flowright';
import { RECIPE } from 'utils/recipeConstants';
import Header from './Header';

const PageLayout = ({ children, updateMutation }) => {
  const routeMatches = map(useRouteMatch, [
    '/home',
    '/admin',
    '/recipe/:id',
    '/addRecipe',
    '/editRecipe/:id',
    '/error',
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
      variables: { recipeId, isFavorite: newValue },
      refetchQueries: ['GetAllRecipes', 'GetRecipe'],
    });
  };

  let title = 'OlyEats';
  const props = {};

  if (match) {
    if (match.url === '/admin') {
      title = 'OlyEats: Admin';
    } else if (match.url === '/addRecipe') {
      title = 'New Recipe';
    } else if (match.url === '/error') {
      title = "You've Found an Error!";
    } else if (match.url.includes('/editRecipe')) {
      title = 'Edit Recipe';
    } else if (match.url.includes('/recipe') && recipeId) {
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
      {children}
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
