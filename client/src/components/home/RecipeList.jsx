import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import RecipeListItem from './RecipeListItem';
import CarrotIcon from '../../images/carrot.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  emptyList: {
    textAlign: 'center',
  },
  carrot: {
    width: '200px',
  },
  carrotText: {
    color: '#DD7017',
    fontSize: '2rem',
  },
}));

const RecipeList = ({ list }) => {
  const classes = useStyles();

  return list.length > 0 ? (
    <List className={classes.root}>
      {list.map((recipe, index, array) => (
        <ListItem
          data-test="recipe-list-item"
          key={recipe.id}
          alignItems="flex-start"
          divider={array.length - 1 !== index}
          button
          component={Link}
          to={`/recipe/${recipe.id}`}
        >
          <RecipeListItem
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.photo}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <div className={classes.emptyList}>
      <img src={CarrotIcon} className={classes.carrot} alt="" />
      <p className={classes.carrotText}>Nothing but carrots here!</p>
    </div>
  );
};

RecipeList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      imageDescription: PropTypes.string,
      buttonText: PropTypes.string,
    })
  ).isRequired,
};

export default RecipeList;
