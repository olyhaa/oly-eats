import React from "react";
import PropTypes from "prop-types";
import DefaultRecipeImg from "../images/defaultRecipeCardImage.png";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

function RecipeListItem({ id, title, description, image }) {
  return (
    <>
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description} />
    </>
  );
}

RecipeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  image: PropTypes.string
};

RecipeListItem.defaultProps = {
  image: DefaultRecipeImg
};

export default RecipeListItem;
