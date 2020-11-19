import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RecipeList from './RecipeList';
import SearchBox from './search/SearchBox';

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

function SearchGroup({ recipeList }) {
  const classes = useStyles();

  const [filterValue, setFilterValue] = useState('');
  const [filteredList, setFilteredList] = useState(
    recipeList.sort((item1, item2) => {
      return item1.title.localeCompare(item2.title);
    })
  );

  const sortAndFilter = (list, filter) => {
    return list
      .filter((recipe) => {
        return recipe.title.toLowerCase().includes(filter.toLowerCase());
      })
      .sort((item1, item2) => {
        return item1.title.localeCompare(item2.title);
      });
  };

  useEffect(() => {
    setFilteredList(sortAndFilter(recipeList, filterValue));
  }, [recipeList]);

  const handleNewFilterValue = (event) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    setFilteredList(sortAndFilter(recipeList, newFilterValue));
  };

  return (
    <>
      <div className={classes.search}>
        <SearchBox setNewFilterValue={handleNewFilterValue} />
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
