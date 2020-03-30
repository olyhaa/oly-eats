import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DefaultRecipeImg from "../../images/defaultRecipeCardImage.png";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  primary: {
    color: theme.palette.text.primary
  },
  secondary: {
    color: theme.palette.text.secondary
  }
}));
function RecipeListItem({ id, title, description, image }) {
  const classes = useStyles();
  return (
    <>
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={description}
        classes={{
          primary: classes.primary,
          secondary: classes.secondary
        }}
      />
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
