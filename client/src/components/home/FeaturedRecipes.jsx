import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';

function FeaturedRecipes({ featuredRecipeList }) {
  return (
    <Grid container justify="center" spacing={2}>
      {featuredRecipeList.map((recipe) => (
        <Grid key={recipe.id} item>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.photo}
            buttonText={recipe.button}
          />
        </Grid>
      ))}
    </Grid>
  );
}

FeaturedRecipes.propTypes = {
  featuredRecipeList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      buttonText: PropTypes.string,
    })
  ).isRequired,
};

export default FeaturedRecipes;
