import React from "react";
import Header from "./components/Header";
import FeaturedRecipes from "./components/FeaturedRecipes";
import RecipeList from "./components/RecipeList";
import RecipeData from "./recipeData/recipes";
import "./App.css";

function App() {
  // Shuffle array
  const shuffledRecipes = RecipeData.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let featuredRecipeList = shuffledRecipes.slice(0, 3);

  return (
    <div className="main-page">
      <Header />
      {featuredRecipeList && (
        <div className="featured-recipe-block">
          <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
        </div>
      )}
      <div className="recipe-list-block">
        <RecipeList recipeList={RecipeData} />
      </div>
    </div>
  );
}

export default App;
