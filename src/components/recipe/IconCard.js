import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { PREP_CARD, TOTAL_CARD, SERVING_CARD } from "../../utils/IconTypes";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {},
  group: {
    padding: theme.spacing(5),
    textAlign: "center"
  },
  icon: {
    margin: theme.spacing(2),
    fontSize: "2rem"
  }
}));

function IconCard({ title, value, type }) {
  const classes = useStyles();

  const getIcon = type => {
    switch (type) {
      case PREP_CARD:
        return "utensils";
      case TOTAL_CARD:
        return "clock";
      case SERVING_CARD:
        return "bread-slice";
    }
  };

  return (
    <Paper className={classes.root}>
      <Box component="div" className={classes.group}>
        <Icon
          color="primary"
          className={`fa fa-${getIcon(type)} ${classes.icon}`}
        />

        <Typography variant="subtitle1">{title}</Typography>

        <Typography variant="subtitle1">{value}</Typography>
      </Box>
    </Paper>
  );
}

IconCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default IconCard;
