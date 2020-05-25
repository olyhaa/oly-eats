import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/react-hooks';
import { getAllRecipesQuery } from 'utils/FetchData';
import Header from '../components/Header';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import SearchGroup from '../components/home/SearchGroup';

const useStyles = makeStyles((theme) => ({
  featuredBlock: {
    margin: theme.spacing(5),
  },
  listBlock: {
    margin: theme.spacing(5),
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed',
  },
}));

function Home() {
  const classes = useStyles();
  const { data, loading } = useQuery(getAllRecipesQuery());

  // TODO
  if (loading) {
    return <span>Loading!</span>;
  }

  const { recipes: RecipeData } = data;

  // Shuffle array
  const shuffledRecipes = RecipeData.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  const featuredRecipeList = shuffledRecipes.slice(0, 3);

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
      <Fab
        color="primary"
        className={classes.fab}
        component={Link}
        to="/addRecipe"
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default Home;
