import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import IngredientItem from "./IngredientItem";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  },
  title: {
    color: theme.palette.secondary
  }
}));

function IngredientSection({ label, ingredients }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {label && (
        <Typography color="secondary" variant="h3" component="h3">
          {label}
        </Typography>
      )}
      <List className={classes.root}>
        {ingredients.map((ingredientItem, index) => {
          return (
            <IngredientItem
              index={index}
              value={ingredientItem.value}
              units={ingredientItem.units}
              description={ingredientItem.description}
              notes={ingredientItem.notes}
            />
          );
        })}
      </List>
    </div>
  );
}

IngredientSection.propTypes = {
  label: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      units: PropTypes.string,
      description: PropTypes.string.isRequired,
      notes: PropTypes.string
    })
  ).isRequired
};

IngredientSection.defaultProps = {
  label: "Ingredients"
};

export default IngredientSection;
