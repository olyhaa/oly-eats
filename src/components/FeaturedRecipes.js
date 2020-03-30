import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%"
  }
}));

function FeaturedRecipes({ featuredRecipeList }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      {featuredRecipeList.map(recipe => (
        <Grid key={recipe.id} item>
          <RecipeCard
            className={classes.card}
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
      id: PropTypes.number.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      buttonText: PropTypes.string
    })
  ).isRequired
};

FeaturedRecipes.defaultProps = {
  featuredRecipeList: []
};

export default FeaturedRecipes;
