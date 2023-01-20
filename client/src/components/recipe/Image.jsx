import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// @ts-ignore
import DefaultRecipeImg from '../../images/defaultRecipeCardImage.png';

const useStyles = makeStyles((theme) => ({
  photoBox: {
    position: 'relative',
    paddingTop: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(56),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(44),
    },
  },
  media: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    width: '100%',
    transform: 'translate(-50%,-50%)',
    objectFit: 'cover',
  },
}));

const Image = ({ title, imageSrc }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.photoBox}>
      <img
        data-test="recipe-photo"
        className={classes.media}
        src={imageSrc}
        alt={title}
      />
    </Paper>
  );
};

Image.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

Image.defaultProps = {
  imageSrc: DefaultRecipeImg,
};

export default Image;
