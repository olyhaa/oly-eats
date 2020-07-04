import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RECIPE } from 'utils/recipeConstants';
import { IngredientItemPropType } from '../../propTypes/IngredientsPropTypes';
import IngredientItem from './IngredientItem';

// TODO
// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary,
  },
}));

function IngredientSection({ label, ingredients }) {
  const classes = useStyles();
  return (
    <Box
      component="div"
      className={classes.root}
      data-test="ingredient-section"
    >
      {label && (
        <Box component="span" className={classes.title}>
          <Typography
            color="secondary"
            variant="h4"
            component="h2"
            data-test="ingredient-section-label"
          >
            {label}
          </Typography>
        </Box>
      )}
      <List>
        {ingredients.map((ingredientItem, index) => {
          return (
            <IngredientItem
              index={index}
              key={index}
              amount={ingredientItem[RECIPE.INGREDIENTS_AMOUNT]}
              rangedAmount={ingredientItem[RECIPE.INGREDIENTS_RANGE]}
              unit={ingredientItem[RECIPE.INGREDIENTS_UNIT]}
              name={ingredientItem[RECIPE.INGREDIENTS_NAME]}
              prep={ingredientItem[RECIPE.INGREDIENTS_PREP]}
              optional={ingredientItem[RECIPE.INGREDIENTS_OPTIONAL]}
              toTaste={ingredientItem[RECIPE.INGREDIENTS_TO_TASTE]}
            />
          );
        })}
      </List>
    </Box>
  );
}

IngredientSection.propTypes = {
  label: PropTypes.string,
  ingredients: PropTypes.arrayOf(IngredientItemPropType).isRequired,
};

IngredientSection.defaultProps = {
  label: 'Ingredients',
};

export default IngredientSection;
