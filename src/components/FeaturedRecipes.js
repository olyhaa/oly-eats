import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";
import Grid from "@material-ui/core/Grid";

function FeaturedRecipes({ featuredRecipeList }) {
  return (
    <Grid container justify="center" spacing={2}>
      {featuredRecipeList.map(recipe => (
        <Grid key={recipe.id} item>
          <RecipeCard
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            imageDescription={recipe.imageDescription}
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
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      imageDescription: PropTypes.string,
      buttonText: PropTypes.string
    })
  ).isRequired
};

FeaturedRecipes.defaultProps = {
  featuredRecipeList: []
};

export default FeaturedRecipes;
