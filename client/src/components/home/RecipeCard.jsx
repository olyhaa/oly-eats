import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import DefaultRecipeImg from 'images/defaultRecipeCardImage.png';
import { RECIPE_DETAIL_PAGE } from 'utils/PageConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 235,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 345,
    },
  },
  media: {
    height: 130,
    [theme.breakpoints.up('md')]: {
      height: 200,
    },
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    textTransform: 'capitalize',
  },
  description: {
    maxHeight: 100,
    overflow: 'hidden',
    '&:hover': {
      maxHeight: 'none',
    },
  },
  buttonBar: {
    marginTop: 'auto',
  },
  actionArea: {
    height: '100%',
  },
}));

function RecipeCard({ id, title, description, image, buttonText }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card data-test="recipe-card" className={classes.root}>
      <CardActionArea
        data-test="recipe-card-primary-action"
        className={classes.actionArea}
        component={Link}
        to={`${RECIPE_DETAIL_PAGE}/${id}`}
      >
        <CardMedia
          data-test="recipe-card-image"
          className={classes.media}
          component="img"
          image={image}
          title={title}
        />
        <CardContent className={classes.info}>
          <Typography
            data-test="recipe-card-title"
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              data-test="recipe-card-description"
              className={classes.description}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonBar}>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`${RECIPE_DETAIL_PAGE}/${id}`}
          data-test="recipe-card-secondary-action"
        >
          {isSmallScreen ? title : buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  buttonText: PropTypes.string,
};

RecipeCard.defaultProps = {
  image: DefaultRecipeImg,
  buttonText: "Let's Try It!",
  description: 'A great new recipe to try!',
};

export default RecipeCard;
