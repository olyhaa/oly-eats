import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DirectionSection from './DirectionSection';
import { Paper } from '@material-ui/core';
import { DirectionStepPropType } from '../../types/DirectionsPropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  }
}));

function Directions({ directionsList }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {directionsList.map(directionSection => {
        return <DirectionSection label={directionSection.label} steps={directionSection.steps} />;
      })}
    </Paper>
  );
}

Directions.propTypes = {
  directionsList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      steps: PropTypes.arrayOf(DirectionStepPropType).isRequired
    }).isRequired
  )
};

Directions.defaultProps = {
  directionsList: []
};

export default Directions;
