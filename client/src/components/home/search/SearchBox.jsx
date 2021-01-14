import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import SearchDropdown from './SearchDropdown';

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

function SearchBox({
  filterString,
  setNewFilterString,
  filterValue,
  setNewFilterValue,
}) {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          data-test="expand-search-area"
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
}

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
  setNewFilterValue: () => {},
};

export default SearchBox;
