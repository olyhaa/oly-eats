import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { RangedAmountPropTypes } from 'propTypes/IngredientsPropTypes';
import { buildIngredientString } from '../../utils/ingredientParsing/ingredientParser';

const useStyles = makeStyles(() => ({
  checkboxLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const IngredientItem = ({
  index,
  recipeScale,
  amount,
  rangedAmount,
  unit,
  name,
  prep,
  optional,
  toTaste,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const ingredientString = buildIngredientString({
    recipeScale,
    amount,
    rangedAmount,
    unit,
    name,
    prep,
    optional,
    toTaste,
  });

  return (
    <ListItem
      data-test="ingredient-list-item"
      key={index}
      role={undefined}
      dense
      button
      onClick={handleToggle(index)}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked.indexOf(index) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `item-${index}` }}
        />
      </ListItemIcon>
      <ListItemText
        data-test={`ingredient-list-item-string-${index}`}
        id={`item-${index}`}
        primary={ingredientString}
        classes={{ primary: classes.checkboxLabel }}
      />
    </ListItem>
  );
};

IngredientItem.propTypes = {
  index: PropTypes.number.isRequired,
  recipeScale: PropTypes.number,
  amount: PropTypes.string,
  rangedAmount: PropTypes.shape(RangedAmountPropTypes),
  unit: PropTypes.string,
  name: PropTypes.string.isRequired,
  prep: PropTypes.string,
  optional: PropTypes.bool,
  toTaste: PropTypes.bool,
};

IngredientItem.defaultProps = {
  recipeScale: 1,
  amount: undefined,
  rangedAmount: undefined,
  unit: undefined,
  prep: undefined,
  optional: false,
  toTaste: false,
};

export default IngredientItem;
