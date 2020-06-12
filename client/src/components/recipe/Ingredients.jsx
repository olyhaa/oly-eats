import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { RECIPE } from 'utils/recipeConstants';
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
    <Paper className={classes.root} data-test="ingredient-box">
      {ingredientList.map((ingredientSection) => {
        return (
          <IngredientSection
            key={ingredientSection[RECIPE.INGREDIENT_SECTION_LABEL]}
            label={ingredientSection[RECIPE.INGREDIENT_SECTION_LABEL]}
            ingredients={
              ingredientSection[RECIPE.INGREDIENT_SECTION_INGREDIENTS]
            }
          />
        );
      })}
    </Paper>
  );
}

Ingredients.propTypes = {
  ingredientList: PropTypes.arrayOf(
    PropTypes.shape(IngredientListPropType).isRequired
  ),
};

Ingredients.defaultProps = {
  ingredientList: [],
};

export default Ingredients;
