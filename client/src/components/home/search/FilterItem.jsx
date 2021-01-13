import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { SEARCH_CATEGORIES, SEARCH_TERMS } from './searchConstants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  deleteButton: {
    margin: theme.spacing(1),
  },
  cancelButton: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

function FilterItem({
  id,
  filterCategory,
  setFilterCategory,
  filterText,
  setFilterText,
  handleDelete,
}) {
  const classes = useStyles();

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div data-test={`filter-item-${id}`}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          data-test="category-dropdown"
          inputProps={{ 'data-test': 'category-select' }}
          value={filterCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {SEARCH_TERMS.map((item) => {
            const { value, label } = item;
            return (
              value !== SEARCH_CATEGORIES.NOT_INITIALIZED && (
                <MenuItem value={value} data-test="search-category-item">
                  {label}
                </MenuItem>
              )
            );
          })}
        </Select>
      </FormControl>

      {filterCategory && (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              inputProps={{ 'data-test': 'search-item-value' }}
              label="Value"
              variant="outlined"
              value={filterText}
              onChange={handleFilterTextChange}
            />
          </FormControl>
          <IconButton aria-label="delete" className={classes.deleteButton}>
            <DeleteIcon onClick={handleDelete} data-test="search-item-delete" />
          </IconButton>
        </>
      )}
      {!filterCategory && (
        <Button className={classes.cancelButton} onClick={handleDelete}>
          Cancel
        </Button>
      )}
    </div>
  );
}

FilterItem.propTypes = {
  id: PropTypes.string.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setFilterCategory: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default FilterItem;
