import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RecipeList from './RecipeList';
import SearchBox from './search/SearchBox';
import {
  convertToFilterString,
  filterAndSort,
  parseFilterString,
} from './search/FilterHelpers';

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

function SearchGroup({ recipeList }) {
  const classes = useStyles();

  const [filterValue, setFilterValue] = useState([]);
  const [filterString, setFilterString] = useState('');
  const [filteredList, setFilteredList] = useState(
    recipeList.sort((item1, item2) => {
      return item1.title.localeCompare(item2.title);
    })
  );

  useEffect(() => {
    setFilteredList(filterAndSort(recipeList, filterValue));
  }, [recipeList]);

  const handleNewFilterString = (filterString) => {
    const filterArray = parseFilterString(filterString);
    setFilterString(filterString);
    setFilterValue(filterArray);
    setFilteredList(filterAndSort(recipeList, filterArray));
  };

  const handleNewFilterValue = (filterArray) => {
    const filterString = convertToFilterString(filterArray);
    setFilterString(filterString);
    setFilterValue(filterArray);
    setFilteredList(filterAndSort(recipeList, filterArray));
  };

  return (
    <>
      <div className={classes.search}>
        <SearchBox
          filterString={filterString}
          setNewFilterString={handleNewFilterString}
          filterValue={filterValue}
          setNewFilterValue={handleNewFilterValue}
        />
      </div>
      <RecipeList list={filteredList} />
    </>
  );
}

SearchGroup.propTypes = {
  recipeList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      imageDescription: PropTypes.string,
      buttonText: PropTypes.string,
    })
  ).isRequired,
};

export default SearchGroup;
