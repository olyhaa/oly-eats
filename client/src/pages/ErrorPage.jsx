import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CarrotIcon from '../images/carrot.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
  carrot: {
    width: '200px',
  },
  carrotText: {
    color: '#DD7017',
    fontSize: '2rem',
  },
}));

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CarrotIcon} className={classes.carrot} alt="" />
      <p className={classes.carrotText}>Nothing but carrots here!</p>
    </div>
  );
};

export default ErrorPage;
