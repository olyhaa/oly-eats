import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { IngredientListPropType } from '../../propTypes/IngredientsPropTypes';
import IngredientSection from './IngredientSection';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

function Ingredients({ ingredientList }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {ingredientList.map((ingredientSection) => {
        return (
          <IngredientSection
            key={ingredientSection.label}
            label={ingredientSection.label}
            ingredients={ingredientSection.ingredients}
          />
        );
      })}
    </Paper>
  );
}

Ingredients.propTypes = {
  ingredientList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      ingredients: PropTypes.arrayOf(IngredientItemPropType).isRequired,
    }).isRequired
  ),
};

Ingredients.defaultProps = {
  ingredientList: [],
};

export default Ingredients;
