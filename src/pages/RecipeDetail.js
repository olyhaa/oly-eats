import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import getRecipeObject from "../utils/RecipeParse";
import CarrotIcon from "../carrot.svg";

const useStyles = makeStyles(theme => ({
  missingRecipe: {
    textAlign: "center",
    margin: "4rem"
  },
  carrot: {
    width: "200px"
  },
  carrotText: {
    color: "#DD7017",
    fontSize: "2rem"
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
    </>
  );
}

export default RecipeDetail;
