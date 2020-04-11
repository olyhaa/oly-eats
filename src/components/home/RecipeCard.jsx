import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// @ts-ignore
import DefaultRecipeImg from 'images/defaultRecipeCardImage.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
  },
  media: {
    height: 200,
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
});

function RecipeCard({ id, title, description, image, buttonText }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.actionArea}
        component={Link}
        to={`/recipe/${id}`}
      >
        <CardMedia
          className={classes.media}
          component="img"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          {description && (
            <Typography
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
          to={`/recipe/${id}`}
        >
          {buttonText}
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
