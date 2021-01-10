import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import { convertToFilterString } from './FilterHelpers';

function SearchDropdown({ filters, setFilterValue }) {
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
      {filters &&
        filters.length > 0 &&
        filters.map((filterItem, index) => {
          return (
            <FilterItem
              key={index}
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
