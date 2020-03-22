import React from "react";
import Header from "./components/Header";
import FeaturedRecipes from "./components/FeaturedRecipes";
import SearchBox from "./components/SearchBox";
import "./App.css";

function App() {
  const featuredRecipeList = [
    {
      title: "Yummy Chili",
      id: 123,
      description: "A warm food for a cold day"
    },
    {
      title: "The Best Sandwich Ever",
      id: 124,
      description: "What, you don't believe me?"
    },
    { title: "Carrot Soup", id: 125, description: "Easy. Simple. Delicious" }
  ];
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
    </div>
  );
}

export default App;
