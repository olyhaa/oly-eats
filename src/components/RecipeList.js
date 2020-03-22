import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import RecipeListItem from "./RecipeListItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.common.white
  }
}));

function RecipeList({ recipeList }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {recipeList.map(recipe => (
        <>
          <ListItem alignItems="flex-start" divider button>
            <RecipeListItem
              id={recipeList.id}
              title={recipe.title}
              description={recipe.description}
            />
          </ListItem>
        </>
      ))}
    </List>
  );
}

RecipeList.propTypes = {
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

RecipeList.defaultProps = {
  recipeList: []
};

export default RecipeList;
