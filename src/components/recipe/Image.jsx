import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
// @ts-ignore
import DefaultRecipeImg from '../../images/defaultRecipeCardImage.png';

const useStyles = makeStyles(() => ({
  photo: {
    width: '100%',
    height: 'auto',
    maxHeight: '410px',
  },
  media: {
    maxheight: 400,
  },
}));

function Image({ title, imageSrc }) {
  const classes = useStyles();
  return (
    <Card className={classes.photo}>
      <CardMedia component="img" src={imageSrc} title={title} />
    </Card>
  );
}

Image.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
};

Image.defaultProps = {
  imageSrc: DefaultRecipeImg,
};

export default Image;
