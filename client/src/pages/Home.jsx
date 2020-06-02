import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { getAllRecipesQuery, removeNulls } from 'utils/FetchData';
import Header from '../components/Header';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import SearchGroup from '../components/home/SearchGroup';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  loading: {
    margin: 'auto',
  },
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
  const { data, error, loading } = useQuery(getAllRecipesQuery());

  // TODO
  if (error) {
    return <span>Error!</span>;
  }

  const { recipes: RecipeData } = removeNulls(data);

  // Shuffle array
  const shuffledRecipes = RecipeData
    ? RecipeData.sort(() => 0.5 - Math.random())
    : [];

  // Get sub-array of first n elements after shuffled
  const featuredRecipeList = shuffledRecipes.slice(0, 3);

  return (
    <>
      <Header title="OlyEats" />
      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
      {!loading && (
        <>
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
      )}
    </>
  );
}

export default Home;
