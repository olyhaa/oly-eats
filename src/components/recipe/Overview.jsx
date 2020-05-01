import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { getDisplayTime, getDisplayDate } from 'utils/formatters';
import {
  PREP_CARD,
  TOTAL_CARD,
  SERVING_CARD,
  SOURCE_CARD,
  DATE_ADDED_CARD,
  DATE_UPDATED_CARD,
} from './IconTypes';
import IconCard from './IconCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function Overview({
  description,
  prepTime,
  totalTime,
  servings,
  source,
  dateAdded,
  lastUpdated,
}) {
  const classes = useStyles();

  const prepTimeDisplay = getDisplayTime(prepTime);
  const totalTimeDisplay = getDisplayTime(totalTime);
  const dateAddedDisplay = getDisplayDate(dateAdded);
  const lastUpdatedDisplay = getDisplayDate(lastUpdated);

  return (
    <Grid container spacing={2} alignItems="stretch">
      {description && (
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Typography variant="subtitle1" component="p">
              {description}
            </Typography>
          </Paper>
        </Grid>
      )}
      {prepTimeDisplay && (
        <Grid item xs>
          <IconCard
            type={PREP_CARD}
            title="Prep Time"
            value={prepTimeDisplay}
          />
        </Grid>
      )}
      {totalTimeDisplay && (
        <Grid item xs>
          <IconCard
            type={TOTAL_CARD}
            title="Total Time"
            value={totalTimeDisplay}
          />
        </Grid>
      )}
      {servings > 0 && (
        <Grid item xs>
          <IconCard type={SERVING_CARD} title="Serves" value={servings} />
        </Grid>
      )}
      {dateAdded && (
        <Grid item xs>
          <IconCard
            type={DATE_ADDED_CARD}
            title="Date Added"
            value={dateAddedDisplay}
          />
        </Grid>
      )}
      {lastUpdated && (
        <Grid item xs>
          <IconCard
            type={DATE_UPDATED_CARD}
            title="Last Updated"
            value={lastUpdatedDisplay}
          />
        </Grid>
      )}
      {source && (
        <Grid item xs>
          <IconCard
            type={SOURCE_CARD}
            title="Source"
            display={source.display}
            value={source.url}
          />
        </Grid>
      )}
    </Grid>
  );
}

Overview.propTypes = {
  prepTime: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      units: PropTypes.string,
    })
  ).isRequired,
  totalTime: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      units: PropTypes.string,
    })
  ).isRequired,
  servings: PropTypes.string.isRequired,
  source: PropTypes.shape({
    display: PropTypes.string,
    url: PropTypes.string,
  }),
  description: PropTypes.string,
  dateAdded: PropTypes.number,
  lastUpdated: PropTypes.number,
};

Overview.defaultProps = {
  source: undefined,
  description: 'A great new recipe to try!',
  dateAdded: undefined,
  lastUpdated: undefined,
};

export default Overview;
