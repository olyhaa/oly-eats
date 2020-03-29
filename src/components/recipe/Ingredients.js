import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IngredientSection from "./IngredientSection";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function Ingredients({ ingredientList }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {ingredientList.map(ingredientSection => {
        return (
          <IngredientSection
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
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number.isRequired,
          units: PropTypes.string,
          description: PropTypes.string.isRequired,
          notes: PropTypes.string
        })
      ).isRequired
    }).isRequired
  )
};

Ingredients.defaultProps = {
  ingredientList: []
};

export default Ingredients;
