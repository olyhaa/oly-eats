import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import {
  fieldInputPropType,
  fieldMetaPropType,
} from '../../propTypes/FormPropTypes';

const useStyles = makeStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    textTransform: 'capitalize',
  },
  chip: {
    margin: 2,
    textTransform: 'capitalize',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  'data-test': 'select-menu-popup',
};

const MultipleSelectField = ({
  input,
  label,
  value,
  required,
  childrenList: childList,
  children,
  ...custom
}) => {
  const classes = useStyles();
  const [selectedValues, setSelectedValues] = useState(input.value || []);
  const id = label.split(' ').join('_').trim();
  const childrenList = [...childList];

  if (!childrenList) {
    console.log(`Error loading ${label} Multiple Select Field`);
    return null;
  }

  childrenList.sort((item1, item2) => {
    return item1.label.localeCompare(item2.label);
  });

  const getTagLabel = (id) => {
    const tags = childrenList.filter((tag) => tag.id === id);
    if (tags.length > 0) {
      return tags[0].label;
    }
    return undefined;
  };

  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={`${id}-select`}
        multiple
        fullWidth
        {...input}
        {...custom}
        input={<Input />}
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((id) => (
              <Chip key={id} label={getTagLabel(id)} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {childrenList.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            <Checkbox checked={selectedValues.indexOf(id) > -1} />
            <ListItemText primary={label} className={classes.chip} />
          </MenuItem>
        ))}

        {children}
      </Select>
    </FormControl>
  );
};

MultipleSelectField.propTypes = {
  input: fieldInputPropType.isRequired,
  meta: fieldMetaPropType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  childrenList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  children: PropTypes.element,
};

MultipleSelectField.defaultProps = {
  required: false,
  children: undefined,
  value: undefined,
};

export default MultipleSelectField;
