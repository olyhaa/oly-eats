import React from "react";
import RecipeCard from "./RecipeCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function FeaturedRecipes() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2].map(value => (
            <Grid key={value} item>
              <RecipeCard
                title={"Yummy Food for Nathan"}
                description={"Something awesome!"}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
