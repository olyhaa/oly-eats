import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import getRecipeObject from "../utils/RecipeParse";
import CarrotIcon from "../carrot.svg";
import Image from "../components/recipe/Image";
import Typography from "@material-ui/core/Typography";
import Ingredients from "../components/recipe/Ingredients";

const useStyles = makeStyles(theme => ({
  missingRecipe: {
    textAlign: "center",
    margin: theme.spacing(5)
  },
  carrot: {
    width: "200px"
  },
  carrotText: {
    color: "#DD7017",
    fontSize: "2rem"
  },
  mainContent: {
    margin: theme.spacing(5)
  },
  subtitle: {
    color: theme.palette.text.secondary
  }
}));

function RecipeDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const recipe = getRecipeObject(id);

  if (!recipe) {
    return (
      <>
        <Header title="No Recipe Found" />
        <div className={classes.missingRecipe}>
          <img src={CarrotIcon} className={classes.carrot} alt="" />
          <p className={classes.carrotText}>Nothing but carrots here!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={recipe.title} />
      <div className={classes.mainContent}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {recipe.description}
        </Typography>
        {recipe.photo && <Image title={recipe.title} imageSrc={recipe.photo} />}
        <Ingredients ingredientList={recipe.ingredientSection} />
      </div>
    </>
  );
}

export default RecipeDetail;
