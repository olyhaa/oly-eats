import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IngredientItem from './IngredientItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IngredientItemPropType } from '../../types/IngredientsPropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  },
  title: {
    color: theme.palette.secondary
  }
}));

function IngredientSection({ label, ingredients }) {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      {label && (
        <Box component="span" className={classes.title}>
          <Typography color="secondary" variant="h3" component="h3">
            {label}
          </Typography>
        </Box>
      )}
      <List className={classes.root}>
        {ingredients.map((ingredientItem, index) => {
          return (
            <IngredientItem
              key={index}
              index={index}
              value={ingredientItem.value}
              units={ingredientItem.units}
              description={ingredientItem.description}
              notes={ingredientItem.notes}
            />
          );
        })}
      </List>
    </Box>
  );
}

IngredientSection.propTypes = {
  label: PropTypes.string,
  ingredients: PropTypes.arrayOf(IngredientItemPropType).isRequired
};

IngredientSection.defaultProps = {
  label: 'Ingredients'
};

export default IngredientSection;
