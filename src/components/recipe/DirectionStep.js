import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  }
}));

function DirectionStep({ id, text }) {
  const classes = useStyles();

  return (
    <ListItem key={id} role={undefined} dense>
      <ListItemText id={id} primary={text} />
    </ListItem>
  );
}

DirectionStep.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default DirectionStep;
