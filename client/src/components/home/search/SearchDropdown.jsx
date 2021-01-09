import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import {
  convertToFilterString,
  initializeFilterSearchObject,
} from './FilterHelpers';

function SearchDropdown({ filterValue, setFilterValue }) {
  const [filters, setFilters] = useState(
    initializeFilterSearchObject(filterValue)
  );

  useEffect(() => {
    setFilters(initializeFilterSearchObject(filterValue));
  }, [filterValue]);

  const handleCategoryUpdate = (index, newCategory) => {
    var newArray = [...filters];
    newArray[index].category = newCategory;
    const filterString = convertToFilterString(newArray);
    setFilterValue(filterString);
  };

  const handleFilterUpdate = (index, newFilter) => {
    var newArray = [...filters];
    newArray[index].value = newFilter;
    const filterString = convertToFilterString(newArray);
    setFilterValue(filterString);
  };

  const handleDelete = (index) => {
    var newArray = [...filters];
    newArray.splice(index, 1);
    const filterString = convertToFilterString(newArray);
    setFilterValue(filterString);
  };

  return (
    <div>
      <div>
        Filter by name. To filter by ingredient, use <code>i:ingredient</code>.
        To filter by source, use <code>s:source</code>. To filter by tag, use{' '}
        <code>tag:tag</code>. To filter by max time, use <code>time:mins</code>.
      </div>
      {filters.map((filterItem, index) => {
        return (
          <FilterItem
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
    </div>
  );
}

const filterShape = PropTypes.arrayOf(PropTypes.string);

SearchDropdown.propTypes = {
  filterValue: PropTypes.shape({
    nameFilters: filterShape,
    ingredientFilters: filterShape,
    sourceFilters: filterShape,
    tagFilters: filterShape,
    maxTimeFilters: filterShape,
  }).isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default SearchDropdown;
