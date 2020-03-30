import React from 'react';
import Header from '../components/Header';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(5)
  }
}));

function AddRecipe() {
  const classes = useStyles();

  return (
    <>
      <Header title="Add New Recipe" />
      <Paper className={classes.root}>
        <p>hello, world</p>
      </Paper>
    </>
  );
}

export default AddRecipe;
