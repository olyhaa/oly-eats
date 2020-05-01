import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { RECIPE } from 'utils/recipeConstants';
import { DirectionStepPropType } from '../../propTypes/DirectionsPropTypes';
import DirectionSection from './DirectionSection';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

function Directions({ directionsList }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {directionsList.map((directionSection) => {
        return (
          <DirectionSection
            key={directionSection[RECIPE.DIRECTIONS_SECTION_LABEL]}
            label={directionSection[RECIPE.DIRECTIONS_SECTION_LABEL]}
            steps={directionSection[RECIPE.DIRECTIONS_SECTION_STEPS]}
          />
        );
      })}
    </Paper>
  );
}

Directions.propTypes = {
  directionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      steps: PropTypes.arrayOf(DirectionStepPropType).isRequired,
    }).isRequired
  ),
};

Directions.defaultProps = {
  directionsList: [],
};

export default Directions;
