import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import FeaturedRecipes from "./components/FeaturedRecipes";
import SearchGroup from "./components/SearchGroup";
import RecipeData from "./recipeData/recipes";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  featuredBlock: {
    margin: "4rem"
  },
  listBlock: {
    margin: "4rem"
  }
}));

function App() {
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
    <ThemeProvider theme={darkTheme}>
      <div>
        <Header />
        {featuredRecipeList && (
          <div className={classes.featuredBlock}>
            <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
          </div>
        )}
        <div className={classes.listBlock}>
          <SearchGroup recipeList={RecipeData} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
