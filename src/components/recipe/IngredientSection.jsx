import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IngredientItemPropType } from '../../types/IngredientsPropTypes';
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
    <Box component="div" className={classes.root}>
      {label && (
        <Box component="span" className={classes.title}>
          <Typography color="secondary" variant="h3" component="h3">
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
              amount={ingredientItem.amount}
              unit={ingredientItem.unit}
              name={ingredientItem.name}
              prep={ingredientItem.prep}
              optional={ingredientItem.optional}
              toTaste={ingredientItem.toTaste}
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
