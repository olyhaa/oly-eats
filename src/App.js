import React from "react";
import Header from "./components/Header";
import FeaturedRecipes from "./components/FeaturedRecipes";
import SearchBox from "./components/SearchBox";
import RecipeList from "./components/RecipeList";
import RecipeData from "./recipeData/recipes";
import "./App.css";

function App() {
  const featuredRecipeList = RecipeData.slice(0, 3);
  return (
    <div className="main-page">
      <Header />
      {featuredRecipeList && (
        <div className="featured-recipe-block">
          <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
        </div>
      )}
      <div className="search-block">
        <SearchBox />
      </div>
      <div className="recipe-list-block">
        <RecipeList recipeList={RecipeData} />
      </div>
    </div>
  );
}

export default App;
