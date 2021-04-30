import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RECIPE } from 'utils/recipeConstants';
import DirectionStep from './DirectionStep';
import { DirectionStepPropType } from '../../propTypes/DirectionsPropTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  list: {},
  title: {},
}));

function DirectionSection({ label, steps }) {
  const classes = useStyles();
  return (
    <Box
      component="div"
      className={classes.root}
      data-test="directions-section"
    >
      {label && (
        <Box component="span" className={classes.title}>
          <Typography
            color="secondary"
            variant="h4"
            component="h2"
            data-test="directions-section-label"
          >
            {label}
          </Typography>
        </Box>
      )}
      <List className={classes.list}>
        {steps.map((step, index) => {
          return (
            <DirectionStep
              id={index}
              key={index}
              text={step[RECIPE.DIRECTIONS_SECTION_TEXT]}
            />
          );
        })}
      </List>
    </Box>
  );
}

DirectionSection.propTypes = {
  label: PropTypes.string,
  steps: PropTypes.arrayOf(DirectionStepPropType).isRequired,
};

DirectionSection.defaultProps = {
  label: 'Directions',
};

export default DirectionSection;
