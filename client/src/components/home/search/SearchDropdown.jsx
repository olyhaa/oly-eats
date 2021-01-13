import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import FilterItem from './FilterItem';
import { convertToFilterString } from './FilterHelpers';
import { SEARCH_CATEGORIES } from './searchConstants';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function SearchDropdown({ filters, setFilterValue }) {
  const classes = useStyles();

  const handleCategoryUpdate = (index, newCategory) => {
    const newArray = [...filters];
    newArray[index].category = newCategory;
    setFilterValue(newArray);
  };

  const handleFilterUpdate = (index, newFilter) => {
    const newArray = [...filters];
    newArray[index].value = newFilter;
    setFilterValue(newArray);
  };

  const handleDelete = (index) => {
    const newArray = [...filters];
    newArray.splice(index, 1);
    setFilterValue(newArray);
  };

  const handleAddNewFilter = () => {
    var newArray = [...filters];
    newArray.push({
      value: '',
      category: SEARCH_CATEGORIES.NOT_INITIALIZED,
    });
    setFilterValue(newArray);
  };

  return (
    <div>
      {filters &&
        filters.length > 0 &&
        filters.map((filterItem, index) => {
          return (
            <FilterItem
              key={index}
              id={index}
              filterCategory={filterItem.category}
              setFilterCategory={(newCategory) => {
                handleCategoryUpdate(index, newCategory);
              }}
              filterText={filterItem.value}
              setFilterText={(newFilter) => {
                handleFilterUpdate(index, newFilter);
              }}
              handleDelete={() => {
                handleDelete(index);
              }}
            />
          );
        })}

      <Button
        variant="contained"
        color="primary"
        data-test="add-search-button"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleAddNewFilter}
      >
        Add another search term
      </Button>
    </div>
  );
}

SearchDropdown.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default SearchDropdown;
