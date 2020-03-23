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

function RecipeList({ list }) {
  const classes = useStyles();

  return list.length > 0 ? (
    <List className={classes.root}>
      {list.map(recipe => (
        <ListItem key={recipe.id} alignItems="flex-start" divider button>
          <RecipeListItem
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <p>Nothing to see here</p>
  );
}

RecipeList.propTypes = {
  list: PropTypes.arrayOf(
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
  list: []
};

export default RecipeList;
