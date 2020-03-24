import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FeaturedRecipes from "../components/FeaturedRecipes";
import SearchGroup from "../components/SearchGroup";
import RecipeData from "../recipeData/recipes";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  featuredBlock: {
    margin: "4rem"
  },
  listBlock: {
    margin: "4rem"
  }
}));

function Home() {
  const classes = useStyles();

  // Shuffle array
  const shuffledRecipes = RecipeData.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let featuredRecipeList = shuffledRecipes.slice(0, 3);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <>
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
