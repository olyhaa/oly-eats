import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { IngredientItemPropType } from '../../types/IngredientsPropTypes';

function IngredientItem({ index, value, units, description, notes }) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked.indexOf(index) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `item-${index}` }}
        />
      </ListItemIcon>
      <ListItemText id={`item-${index}`} primary={`${value} ${units} ${description} ${notes}`} />
    </ListItem>
  );
}

IngredientItem.propTypes = {
  index: PropTypes.number.isRequired,
  ...IngredientItemPropType
};

IngredientItem.defaultProps = {
  units: '',
  notes: ''
};

export default IngredientItem;
