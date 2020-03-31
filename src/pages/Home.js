import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import SearchGroup from '../components/home/SearchGroup';
import RecipeData from '../recipeData/recipes';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  featuredBlock: {
    margin: theme.spacing(5)
  },
  listBlock: {
    margin: theme.spacing(5)
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed'
  }
}));

function Home() {
  const classes = useStyles();

  // Shuffle array
  const shuffledRecipes = RecipeData.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let featuredRecipeList = shuffledRecipes.slice(0, 3);

  return (
    <>
      <Header title="OlyEats" />
      {featuredRecipeList && (
        <div className={classes.featuredBlock}>
          <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
        </div>
      )}
      <div className={classes.listBlock}>
        <SearchGroup recipeList={RecipeData} />
      </div>
      <Fab color="primary" className={classes.fab} component={Link} to="/addRecipe">
        <AddIcon />
      </Fab>
    </>
  );
}

export default Home;
