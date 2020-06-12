import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// @ts-ignore
import DefaultRecipeImg from '../../images/defaultRecipeCardImage.png';

const useStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.text.primary,
    textTransform: 'capitalize',
  },
  secondary: {
    color: theme.palette.text.secondary,
  },
}));
function RecipeListItem({ title, description, image }) {
  const classes = useStyles();
  return (
    <>
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ 'data-test': 'recipe-title' }}
        primary={title}
        secondary={description}
        classes={{
          primary: classes.primary,
          secondary: classes.secondary,
        }}
      />
    </>
  );
}

RecipeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};

RecipeListItem.defaultProps = {
  image: DefaultRecipeImg,
  description: '',
};

export default RecipeListItem;
