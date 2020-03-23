import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import RecipeList from "./RecipeList";
import SearchBox from "./SearchBox";

const useStyles = makeStyles(theme => ({
  search: {
    marginTop: "4rem",
    marginBottom: "4rem"
  }
}));

function SearchGroup({ recipeList }) {
  const classes = useStyles();

  const [filteredList, setFilteredList] = useState(
    recipeList.sort((item1, item2) => {
      return item1.title.localeCompare(item2.title);
    })
  );

  const handleNewFilterValue = event => {
    const newFilterValue = event.target.value;
    setFilteredList(
      recipeList.filter(recipe => {
        return recipe.title
          .toLowerCase()
          .includes(newFilterValue.toLowerCase());
      })
    );
  };

  return (
    <>
      <div className={classes.search}>
        <SearchBox setNewFilterValue={handleNewFilterValue} />
      </div>
      <RecipeList list={filteredList} />
    </>
  );
}

SearchGroup.propTypes = {
  recipeList: PropTypes.arrayOf(
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

SearchGroup.defaultProps = {
  recipeList: []
};

export default SearchGroup;
