import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  PREP_CARD,
  TOTAL_CARD,
  SERVING_CARD,
  SOURCE_CARD
} from "../../utils/IconTypes";
import IconCard from "./IconCard";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%"
  },
  root: {
    padding: theme.spacing(2)
  }
}));

function Overview({ description, prepTime, totalTime, servings, source }) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="stretch" className={classes.card}>
      {description && (
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Typography variant="subtitle2" component="p">
              {description}
            </Typography>
          </Paper>
        </Grid>
      )}
      {prepTime && (
        <Grid item xs>
          <IconCard
            className={classes.card}
            type={PREP_CARD}
            title={"Prep Time"}
            value={`${prepTime.value} ${prepTime.units}`}
          />
        </Grid>
      )}
      {totalTime && (
        <Grid item xs>
          <IconCard
            className={classes.card}
            type={TOTAL_CARD}
            title={"Total Time"}
            value={`${totalTime.value} ${totalTime.units}`}
          />
        </Grid>
      )}
      {servings > 0 && (
        <Grid item xs>
          <IconCard
            className={classes.card}
            type={SERVING_CARD}
            title={"Serves"}
            value={servings}
          />
        </Grid>
      )}
      {source && (
        <Grid item xs>
          <IconCard
            className={classes.card}
            type={SOURCE_CARD}
            title={"Source"}
            display={source.display}
            value={source.url}
          />
        </Grid>
      )}
    </Grid>
  );
}

Overview.propTypes = {
  prepTime: PropTypes.shape({
    value: PropTypes.number,
    units: PropTypes.string
  }).isRequired,
  totalTime: PropTypes.shape({
    value: PropTypes.number,
    units: PropTypes.string
  }).isRequired,
  servings: PropTypes.number.isRequired,
  source: PropTypes.shape({
    display: PropTypes.string,
    url: PropTypes.string
  })
};

Overview.defaultProps = {
  prepTime: undefined,
  totalTime: undefined,
  servings: 0,
  source: undefined
};

export default Overview;
