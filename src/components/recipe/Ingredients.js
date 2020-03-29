import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IngredientSection from "./IngredientSection";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  }
}));

function Ingredients({ ingredientList }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {ingredientList.map(ingredientSection => {
        return (
          <IngredientSection
            label={ingredientSection.label}
            ingredients={ingredientSection.ingredients}
          />
        );
      })}
    </div>
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

export default Ingredients;
