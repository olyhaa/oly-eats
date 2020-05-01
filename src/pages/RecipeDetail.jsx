import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { RECIPE } from 'utils/recipeConstants';
import EditIcon from '@material-ui/icons/Edit';
import getRecipeObject from '../utils/FetchData';
import CarrotIcon from '../images/carrot.svg';
import Image from '../components/recipe/Image';
import Ingredients from '../components/recipe/Ingredients';
import Directions from '../components/recipe/Directions';
import Overview from '../components/recipe/Overview';
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  missingRecipe: {
    textAlign: 'center',
    margin: theme.spacing(5),
  },
  carrot: {
    width: '200px',
  },
  carrotText: {
    color: '#DD7017',
    fontSize: '2rem',
  },
  mainContent: {
    margin: theme.spacing(5),
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  photoGrid: {
    width: '100%',
    height: 'auto',
    alignSelf: 'flex-end',
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

function RecipeDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const recipe = getRecipeObject(id);

  if (!recipe) {
    return (
      <>
        <Header title="OlyEats: No Recipe Found" />
        <div className={classes.missingRecipe}>
          <img src={CarrotIcon} className={classes.carrot} alt="" />
          <p className={classes.carrotText}>Nothing but carrots here!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={`OlyEats: ${recipe[RECIPE.TITLE]}`} />
      <div className={classes.mainContent}>
        <div className={classes.root}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid className={classes.photoGrid} item xs={6}>
              <Image
                title={recipe[RECIPE.TITLE]}
                imageSrc={recipe[RECIPE.PHOTO]}
              />
            </Grid>
            <Grid className={classes.photoGrid} item xs={6}>
              <Overview
                description={recipe[RECIPE.DESCRIPTION]}
                prepTime={recipe[RECIPE.TIMING][RECIPE.TIMING_PREP]}
                totalTime={recipe[RECIPE.TIMING][RECIPE.TIMING_TOTAL]}
                servings={recipe[RECIPE.SERVINGS]}
                source={recipe[RECIPE.SOURCE]}
                dateAdded={recipe[RECIPE.DATE_ADDED]}
                lastUpdated={recipe[RECIPE.DATE_UPDATED]}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={4}>
              <Ingredients ingredientList={recipe[RECIPE.INGREDIENT_SECTION]} />
            </Grid>
            <Grid item xs={8}>
              <Directions directionsList={recipe[RECIPE.DIRECTIONS_SECTION]} />
            </Grid>
          </Grid>
        </div>
      </div>
      <Fab
        color="primary"
        className={classes.fab}
        component={Link}
        to={`/editRecipe/${id}`}
      >
        <EditIcon />
      </Fab>
    </>
  );
}

export default RecipeDetail;
