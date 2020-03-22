import React from "react";
import Header from "./components/Header";
import FeaturedRecipes from "./components/FeaturedRecipes";
import SearchBox from "./components/SearchBox";
import "./App.css";

function App() {
  return (
    <div className="main-page">
      <Header />
      <div className="featured-recipe-block">
        <FeaturedRecipes />
      </div>
      <div className="search-block">
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
