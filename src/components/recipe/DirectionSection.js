import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DirectionStep from './DirectionStep';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { DirectionStepPropType } from '../../types/DirectionsPropTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  },
  list: {},
  title: {}
}));

function DirectionSection({ label, steps }) {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      {label && (
        <Box component="span" className={classes.title}>
          <Typography color="secondary" variant="h3" component="h3">
            {label}
          </Typography>
        </Box>
      )}
      <List className={classes.list}>
        {steps.map(step => {
          return <DirectionStep id={step.id} text={step.text} />;
        })}
      </List>
    </Box>
  );
}

DirectionSection.propTypes = {
  label: PropTypes.string,
  steps: PropTypes.arrayOf(DirectionStepPropType).isRequired
};

DirectionSection.defaultProps = {
  label: 'Directions'
};

export default DirectionSection;
