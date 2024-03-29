import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/client';
import { getAllRecipesQuery, removeNulls } from 'utils/FetchData';
import { ADD_RECIPE_PAGE, ERROR_PAGE } from 'utils/PageConstants';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import SearchGroup from '../components/home/SearchGroup';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: 'auto',
  },
  featuredBlock: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  skeletonSearch: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  skeletonCard: {
    width: 125,
    height: 180,
    [theme.breakpoints.up('md')]: {
      width: 235,
      height: 460,
    },
    [theme.breakpoints.up('lg')]: {
      width: 345,
      height: 420,
    },
  },
  listBlock: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
    },
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

const Home = () => {
  const classes = useStyles();
  const { data, error, loading } = useQuery(getAllRecipesQuery());

  if (error) {
    return <Redirect to={ERROR_PAGE} />;
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
      <div className={classes.featuredBlock} data-test="featured-list">
        {!loading && featuredRecipeList ? (
          <FeaturedRecipes featuredRecipeList={featuredRecipeList} />
        ) : (
          <Grid container justify="center" spacing={2}>
            <Grid item className={classes.skeletonCard}>
              <Skeleton width="100%" height="100%" />
            </Grid>
            <Grid item className={classes.skeletonCard}>
              <Skeleton width="100%" height="100%" />
            </Grid>
            <Grid item className={classes.skeletonCard}>
              <Skeleton width="100%" height="100%" />
            </Grid>
          </Grid>
        )}
      </div>
      <div className={classes.listBlock}>
        {!loading ? (
          <SearchGroup recipeList={RecipeData} />
        ) : (
          <>
            <Skeleton
              variant="rect"
              height={60}
              className={classes.skeletonSearch}
            />
            <Skeleton
              variant="rect"
              height={250}
              className={classes.skeletonSearch}
            />
          </>
        )}
      </div>
      {!loading && (
        <Fab
          data-test="add-recipe"
          color="primary"
          className={classes.fab}
          component={Link}
          to={ADD_RECIPE_PAGE}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default Home;
