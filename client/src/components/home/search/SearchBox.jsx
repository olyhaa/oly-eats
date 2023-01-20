import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import SearchDropdown from './SearchDropdown';
import { SEARCH_ATTRIBUTES, SEARCH_CATEGORIES } from './searchConstants';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
  searchIcon: {
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1, 0),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: theme.palette.text.primary,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
  },
}));

const SearchBox = ({
  filterString,
  setNewFilterString,
  filterValue,
  setNewFilterValue,
}) => {
  const classes = useStyles();

  const isFavorite = !isEmpty(
    filterValue.filter(
      (filter) =>
        filter.category === SEARCH_CATEGORIES.ATTRIBUTES &&
        filter.value === SEARCH_ATTRIBUTES.FAVORITE
    )
  );

  const setIsFavorite = (newValue) => {
    let newArray = Array.from(filterValue);
    if (newValue) {
      newArray.push({
        value: SEARCH_ATTRIBUTES.FAVORITE,
        category: SEARCH_CATEGORIES.ATTRIBUTES,
      });
    } else {
      newArray = filterValue.filter(
        (filter) =>
          filter.category !== SEARCH_CATEGORIES.ATTRIBUTE &&
          filter.value !== SEARCH_ATTRIBUTES.FAVORITE
      );
    }
    setNewFilterValue(newArray);
  };

  return (
    <div className={classes.search}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          IconButtonProps={{ 'data-test': 'expand-search-area' }}
        >
          <div className={classes.searchIcon}>
            <SearchIcon color="primary" fontSize="large" />
          </div>
          <InputBase
            placeholder="Filter by Name..."
            onChange={(event) => {
              setNewFilterString(event.target.value);
            }}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            value={filterString}
            fullWidth
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search', 'data-test': 'search-box' }}
          />

          <IconButton
            aria-label="show favorites"
            color="primary"
            size="medium"
            onClick={(event) => {
              event.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SearchDropdown
            filters={filterValue}
            setFilterValue={setNewFilterValue}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

SearchBox.propTypes = {
  filterString: PropTypes.string.isRequired,
  setNewFilterString: PropTypes.func,
  filterValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      category: PropTypes.string,
    })
  ).isRequired,
  setNewFilterValue: PropTypes.func,
};

SearchBox.defaultProps = {
  setNewFilterString: () => {},
  setNewFilterValue: () => {},
};

export default SearchBox;
