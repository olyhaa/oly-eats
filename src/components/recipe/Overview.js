import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { PREP_CARD, TOTAL_CARD, SERVING_CARD } from "../../utils/IconTypes";
import IconCard from "./IconCard";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function Overview({ prepTime, totalTime, servings }) {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {prepTime && (
        <Grid item xs={6}>
          <IconCard
            type={PREP_CARD}
            title={"Prep Time"}
            value={`${prepTime.value} ${prepTime.units}`}
          />
        </Grid>
      )}
      {totalTime && (
        <Grid item xs={6}>
          <IconCard
            type={TOTAL_CARD}
            title={"Total Time"}
            value={`${totalTime.value} ${totalTime.units}`}
          />
        </Grid>
      )}
      {servings > 0 && (
        <Grid item xs={6}>
          <IconCard
            type={SERVING_CARD}
            title={"Serves"}
            value={`${servings}`}
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
  servings: PropTypes.number.isRequired
};

Overview.defaultProps = {
  prepTime: undefined,
  totalTime: undefined,
  servings: 0
};

export default Overview;
