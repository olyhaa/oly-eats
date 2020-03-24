import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

function RecipeDetail() {
  const classes = useStyles();

  return (
    <div>
      <p>A recipe goes here!</p>
    </div>
  );
}

export default RecipeDetail;
