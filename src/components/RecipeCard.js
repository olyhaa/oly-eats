import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DefaultRecipeImg from "../images/defaultRecipeCardImage.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%"
  },
  media: {
    height: 200
  },
  buttonBar: {
    marginTop: "auto"
  }
});

function RecipeCard({ id, title, description, image, buttonText }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={"/recipe/" + id}>
        <CardMedia
          className={classes.media}
          component="img"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="textSecondary.dark"
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
          color="inherit"
          component={Link}
          to={"/recipe/" + id}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  buttonText: PropTypes.string
};

RecipeCard.defaultProps = {
  image: DefaultRecipeImg,
  buttonText: "Let's Try It!"
};

export default RecipeCard;
