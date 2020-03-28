import React from "react";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core/styles";
import FeaturedRecipes from "../components/FeaturedRecipes";
import SearchGroup from "../components/SearchGroup";
import RecipeData from "../recipeData/recipes";

const useStyles = makeStyles(theme => ({
  featuredBlock: {
    margin: theme.spacing(5)
  },
  listBlock: {
    margin: theme.spacing(5)
  }
}));

function Home() {
  const classes = useStyles();

  // Shuffle array
  const shuffledRecipes = RecipeData.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let featuredRecipeList = shuffledRecipes.slice(0, 3);

  return (
    <>
      <Header title="OlyEats" />
      {featuredRecipeList && (
        <div className={classes.featuredBlock}>
          <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
        </div>
      )}
      <div className={classes.listBlock}>
        <SearchGroup recipeList={RecipeData} />
      </div>
    </>
  );
}

export default Home;
